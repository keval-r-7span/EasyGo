const winston = require("winston");

const logger = winston.createLogger({
    level: 'info', // Logging level
    format: winston.format.combine(
		winston.format.json(),
		winston.format.colorize()
	),
    // Format the log output as JSON
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' }) // create file and save log
    ]
  });

module.exports = logger;