import jwt from 'jsonwebtoken'
import { JWT } from "./constants";

const generateAccessToken = (user:object) => {
  
  const options = { expiresIn: JWT.EXPIRES };
  return jwt.sign(user, JWT.SECRET, options);
};

export default generateAccessToken;