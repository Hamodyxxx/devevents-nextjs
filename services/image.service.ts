import { UploadApiResponse, v2 } from "cloudinary";

/**
 * Uploads an image buffer to Cloudinary's "eventsImgs" folder.
 *
 * @param buffer - The image data to upload as a Node.js `Buffer`
 * @returns The Cloudinary upload response (`UploadApiResponse`)
 * @throws The error returned by Cloudinary if the upload fails
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