const logger  = require("../helper/logger");

exports.trueResponse = (res, data) => {
  return res.status(200).json({
    sucess: true,
    data,
    message: "OK",
  });
};

exports.falseResponse = (res) => {
  logger.warn("NO DATA AVILABLE")
  return res.status(200).json({
    sucess: false,
    message: "ERROR",
  });
};

exports.falseResponse = (res, err) => {
  logger.error("ERROR " + err)
  return res.status(404).json({
    sucess: false,
    message: err,
  });
};
