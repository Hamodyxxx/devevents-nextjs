import { tryCatch } from "@/lib/try-catch";
import { createEvent } from "@/server/data-access";
import { base } from "@/server/orpc";
import { uploadImageToCloudinaryService } from "@/server/services/image.service";
import { v2 } from "cloudinary";
import { revalidateTag } from "next/cache";

export const createEventProcedure = base.event.create
    .handler(async ({ input }) => {
        const file = input.image as File;

        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult = await uploadImageToCloudinaryService(buffer);

        const {
            data,
            error
        } = await tryCatch(createEvent({
            ...input,
            image: uploadResult.secure_url,
        }));

        if(error) {
            await v2.uploader.destroy(uploadResult.public_id);
            throw error;
        }

        revalidateTag("featured events", "hours");
    
        return data;
    })