const path = require('path')

const winston = require('winston')
const ENV = process.env.ENV || 'dev';

const logFormat = winston.format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

const logger = winston.createLogger({
    // change level if in dev environment versus production
    level: ENV === 'production' ? 'INFO' : 'DEBUG',
    format: winston.format.combine(
        // winston.format.label({ label: __filename.split('/').pop() }),
        winston.format.label({ label: path.basename(process.mainModule.filename) }),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            logFormat
          )
        }),
      ],
    exitOnError: false,
})

  
logger.level = process.env.LOG_LEVEL || "silly";

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;