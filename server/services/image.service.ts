import { UploadApiResponse, v2 } from "cloudinary";

/**
 * Uploads image data to Cloudinary into the "eventsImgs" folder.
 *
 * @param buffer - Node.js `Buffer` containing the image bytes to upload
 * @returns The Cloudinary upload response (`UploadApiResponse`)
 */
export async function uploadImageToCloudinaryService(buffer: Buffer) {
    const uploadResult = await new Promise((res, rej) => {
        v2.uploader.upload_stream({ resource_type: "image", folder: "eventsImgs"}, (error, results) => {
            if(error) return rej(error);

            res(results);
        }).end(buffer);
    })

    return uploadResult as UploadApiResponse;
}