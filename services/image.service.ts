import { UploadApiResponse, v2 } from "cloudinary";

export async function uploadImageToCloudinaryService(buffer: Buffer) {
    const uploadResult = await new Promise((res, rej) => {
        v2.uploader.upload_stream({ resource_type: "image", folder: "eventsImgs"}, (error, results) => {
            if(error) return rej(error);

            res(results);
        }).end(buffer);
    })

    return uploadResult as UploadApiResponse;
}