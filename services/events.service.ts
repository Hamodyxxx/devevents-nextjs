import Event from "@/database/event.model";
import { BadRequestError } from "@/lib/app-error";
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
        throw new Error("Couldn't create event")
    };


    return createdEventResult.data;
}