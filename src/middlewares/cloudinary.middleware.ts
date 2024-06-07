import multer from "multer";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../helpers/cloudinary";
import { UploadApiResponse } from "cloudinary";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFn = (
  req: Request,
  res: Response,
  next: NextFunction,
  file: Express.Multer.File,
  email: any
) => {
  cloudinary.uploader
    .upload_stream(
      { resource_type: "image", folder: email },
      (error: any, result: any) => {
        if (error) {
          return res.status(500).send("Upload to Cloudinary failed.");
        }

        req.body.imageUrl = result.secure_url;
        next();
      }
    )
    .end(file.buffer);
};

const uploadToCloudinary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    // if (!req.file) {
    //   return res.status(400).send("No file uploaded.");
    // }

    const file = req.file;

    if (file) {
      cloudinary.api.root_folders().then((value) => {
        if (value.name === email) {
          //console.log("FOLDER ALREADY EXIST", { value });
          uploadFn(req, res, next, file, email);
        } else {
          cloudinary.api.create_folder(email).then((value) => {
            //console.log("NEW FOLDER CREATED", { value });
            uploadFn(req, res, next, file, email);
          });
        }
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { upload, uploadToCloudinary };
