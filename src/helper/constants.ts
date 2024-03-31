import dotenv from 'dotenv';
dotenv.config()

const PORT = parseInt(process.env.PORT || "3200");

const JWT = {
  SECRET: process.env.JWT_SECRET,
  EXPIRES: process.env.EXPIRES,
};

interface DBData {
  DB_URL: string;
}

const DB_DATA: DBData = {
  DB_URL: process.env.DB_URL || '',
};

const TWILIO = {
  ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  SERVICE_SID: process.env.TWILIO_SERVICE_SID,
};

const MAIL={
    HOST:process.env.MAIL_HOST,
    USER:process.env.MAIL_USER,
    PASS:process.env.MAIL_PASS
}
const DISTANCE = {
  DISTANCE_MATRIX: process.env.DISTANCE_MATRIX_KEY,
};

export { PORT, JWT, DB_DATA, TWILIO,MAIL, DISTANCE };
