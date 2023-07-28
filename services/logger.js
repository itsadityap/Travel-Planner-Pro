const winston = require('winston');
const path = require('path');

const logDirectory = path.resolve(__dirname, '../logs');

const backendLoggerService = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: `${logDirectory}/flow.log`,
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            )
        }),
        new winston.transports.File({
            filename: `${logDirectory}/error.log`,
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            )
        })
    ]
});

module.exports = { backendLoggerService };