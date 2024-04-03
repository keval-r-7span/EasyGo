var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DISTANCE } from '../helper/constants';
import dotenv from 'dotenv';
dotenv.config();
const calcDistance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = DISTANCE.DISTANCE_MATRIX;
        const { origins, destinations } = req.body;
        const response = yield fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&mode=driving&departure_time=now&key=${apiKey}`);
        const data = yield response.json();
        const traveledDistance = data.rows[0].elements[0].distance.value;
        const totalFare = Math.ceil(traveledDistance * 0.022);
        return res.status(200).json({ sucess: true, data: totalFare, distance: traveledDistance });
    }
    catch (error) {
        return res.status(200).json({ sucess: true, data: error });
    }
});
export default calcDistance;
