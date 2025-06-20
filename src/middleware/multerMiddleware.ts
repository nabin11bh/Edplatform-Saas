import multer from "multer";
import { Request } from "express";

// Create storage engine
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, './src/storage'); // folder to save files
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + "-" + file.originalname); // file naming convention
  }
});

// Export multer and storage
export { multer, storage };
