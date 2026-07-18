import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

const configured = Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
if (configured) cloudinary.config({ cloud_name: env.CLOUDINARY_CLOUD_NAME, api_key: env.CLOUDINARY_API_KEY, api_secret: env.CLOUDINARY_API_SECRET, secure: true });

export async function uploadMedicalDocument(file: Express.Multer.File) {
  if (!configured) throw new AppError(503, "Medical document storage is not configured.");
  return new Promise<{ secureUrl: string; publicId: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: "raw", folder: "carebridge/medical-documents" }, (error, result) => {
      if (error || !result) return reject(new AppError(502, "Medical document upload failed."));
      resolve({ secureUrl: result.secure_url, publicId: result.public_id });
    });
    stream.end(file.buffer);
  });
}
