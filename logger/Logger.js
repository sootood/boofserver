const winston = require('winston');
require('winston-daily-rotate-file');

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH-mm',
    frequency:'3d',
    maxSize:'20m',
    zippedArchive:true,
  });
  
const logger = winston.createLogger({

    format: winston.format.simple(),

    transports: [
      
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console(),
        fileRotateTransport
    ],
});
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }



module.exports = logger
