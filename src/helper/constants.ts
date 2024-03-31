import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT;

interface JWTConfig {
  SECRET: string;
  EXPIRES: string;
}

const JWT: JWTConfig = {
  SECRET: process.env.JWT_SECRET || "", 
  EXPIRES: process.env.EXPIRES || "",
};

interface DBDATA{
    DB_URL: string
}

const DB_DATA : DBDATA= {
  DB_URL: process.env.DB_URL || "",
};


interface TwilloConfig{
  ACCOUNT_SID:string,
  AUTH_TOKEN:string,
  SERVICE_SID:string
}
const TWILIO :TwilloConfig= {
  ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
  AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN|| "" ,
  SERVICE_SID: process.env.TWILIO_SERVICE_SID|| "",
};

const DISTANCE = {
  DISTANCE_MATRIX: process.env.DISTANCE_MATRIX_KEY,
};

const MAIL={
    HOST:process.env.MAIL_HOST,
    USER:process.env.MAIL_USER,
    PASS:process.env.MAIL_PASS
}

export {PORT,JWT,DB_DATA,TWILIO,DISTANCE,MAIL}