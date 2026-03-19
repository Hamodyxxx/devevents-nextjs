import Event, { IEvent } from "@/database/event.model";
import { AppError, BadRequestError, NotFoundError } from "@/lib/app-error";
import dbConnect from "@/lib/mongo";
import { tryCatch, tryCatchSync } from "@/lib/try-catch";
import { v2 } from "cloudinary";
import { uploadImageToCloudinaryService } from "./image.service";

export async function createEventService(
    eventData: FormData
) {
    await dbConnect();

    const {data: event, error} = tryCatchSync(() => Object.fromEntries(eventData));

    if(error) throw new BadRequestError("Invalid JSON data format");

    const file = eventData.get('image') as File;
    
    if(!file) throw new BadRequestError('image is required');

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await uploadImageToCloudinaryService(buffer);

    event.image = uploadResult.secure_url;

    const createdEventResult = await tryCatch(Event.create(event));

    if(createdEventResult.error) {
        await tryCatch(v2.uploader.destroy(uploadResult.public_id));
        throw createdEventResult.error;
    };


    return createdEventResult.data;
}

export async function getAllEventsService() {
    await dbConnect();

    const eventsRes = await tryCatch(Event.find().sort({createdAt: -1}));

    if(eventsRes.error) throw new Error();

    return eventsRes.data;
}

export async function getEventBySlug(slug: string) {
    await dbConnect();

    const eventsRes = await tryCatch(Event.findOne({slug}) as Promise<IEvent | null>);

    if(eventsRes.error) throw new Error();
    if(!eventsRes.data) throw new NotFoundError("There is no Event with this Slug");

    return eventsRes.data;
}