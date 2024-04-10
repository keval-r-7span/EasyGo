import multer,{FileFilterCallback} from "multer";
import { Request } from "express";
import path from "path";

const storage = multer.memoryStorage();

export const upload = multer({
    storage: storage,
    limits:{
        fileSize:1000000
    },
    fileFilter: (req: Request, file:Express.Multer.File, cb:FileFilterCallback) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Please upload a JPEG, JPG or PNG image'));
}}).array('images',5);