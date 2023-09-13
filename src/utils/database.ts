import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const database = new PrismaClient({
  log: [
    // {
    //   emit: 'stdout',
    //   level: 'query',
    // },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ]
})

database.$on('error', event => {
  logger.error(`Database error - ${event.message}`)
})

database.$on('info', event => {
  logger.info(`Database info - ${event.message}`)
})

database.$on('warn', event => {
  logger.warn(`Database warning ${event.message}`)
})

export default database