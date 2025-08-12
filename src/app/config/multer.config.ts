import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const fileName = file.originalname
        .toLowerCase()
        .replace(/\s+/g, "-") // empty space remove with dash
        .replace(/\./g, "-")
        .replace(/[^a-z0-9\-\.]/g, ""); // non alpha numenric #$!

      const extension = file.originalname.split(".").pop();

      const uniqueName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileName +
        "." +
        extension;

      return uniqueName;
    },
  },
});

export const multerUpload = multer({ storage: storage });
