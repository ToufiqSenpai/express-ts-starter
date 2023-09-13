import * as winston from "winston"

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.printf(info => {
    return `[${info.level.toUpperCase()}] ${new Date().toISOString()} : ${info.message}`
  }),
  level: 'debug'
})

export default logger