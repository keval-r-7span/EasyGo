import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const JWT = {
    SECRET: process.env.JWT_SECRET || "",
    EXPIRES: process.env.EXPIRES || "",
};
const DB_DATA = {
    DB_URL: process.env.DB_URL || "",
};
const TWILIO = {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
    SERVICE_SID: process.env.TWILIO_SERVICE_SID || "",
};
const DISTANCE = {
    DISTANCE_MATRIX: process.env.DISTANCE_MATRIX_KEY,
};
const MAIL = {
    HOST: process.env.MAIL_HOST,
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS,
};
export { PORT, JWT, DB_DATA, TWILIO, DISTANCE, MAIL };
