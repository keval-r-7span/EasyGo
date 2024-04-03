import jwt from 'jsonwebtoken';
import { JWT } from "../helper/constants";
const generateAccessToken = (user) => {
    const payload = {
        _id: user._id,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
    };
    const options = { expiresIn: JWT.EXPIRES };
    return jwt.sign(payload, JWT.SECRET, options);
};
export default generateAccessToken;
