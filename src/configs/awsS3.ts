import AWS from 'aws-sdk';
import { AWS_S3 } from '../helper/constants';

export const s3 = new AWS.S3({
  accessKeyId:AWS_S3.API_KEY,
  secretAccessKey:AWS_S3.SECRET
});