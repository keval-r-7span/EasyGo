// import logger from '../utils/logger'

// exports.trueResponse = (res:Response, data:object) => {
//   return res.status(200).json({
//     sucess: true,
//     data,
//     message: "OK",
//   });
// };

// exports.falseResponse = (res:Response) => {
//   logger.warn("NO DATA AVILABLE")
//   return res.status(200).json({
//     sucess: false,
//     message: "ERROR",
//   });
// };

// exports.falseResponse = (res:Response, err:string) => {
//   logger.error("ERROR " + err)
//   return res.status(404).json({
//     sucess: false,
//     message: "error occured "+err,
//   });
// };
