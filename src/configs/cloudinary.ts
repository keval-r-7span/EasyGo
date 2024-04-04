import logger from "../utils/logger";
import { v2 as cloudinary } from 'cloudinary'
import {CLOUDINARY} from '../helper/constants'

export const concloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: CLOUDINARY.NAME,
      api_key: CLOUDINARY.KEY,
      api_secret: CLOUDINARY.SECRET,
    });
    logger.info("Cloudinary connection successful..");
  } catch (error) {
    logger.error("Error in Cloudinary connection: " + error);
  }
};
