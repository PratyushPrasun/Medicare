import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Upload
export async function uploadToCloudinary(filepath, folder = "Doctor") {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder,
      resource_type: "image",
    });

    // ✅ Delete local file safely
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // ❗ Clean up file even if upload fails
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    throw error;
  }
}

// ✅ Delete
export async function deleteFromCloudinary(publicId) {
  try {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete err:", error);
    throw error;
  }
}

export default cloudinary;