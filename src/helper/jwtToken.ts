import jwt from 'jsonwebtoken'
import { JWT } from "./constants";

const generateAccessToken = (user: { _id: any; phoneNumber: string; email: string; role: string; }) => {
  const payload = {
    _id:  user._id,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role,
  };
  const options = { expiresIn: JWT.EXPIRES };
  return jwt.sign(payload, JWT.SECRET, options);
};

export default generateAccessToken;