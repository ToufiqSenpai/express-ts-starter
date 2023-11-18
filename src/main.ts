import express from 'express'
import logger from './utils/logger'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import homeRouter from './routes/home-route'
import errorHandling from './middlewares/errorHandling'

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())

app.use(cookieParser())

app.use(express.json({ type: 'application/json' }))

app.use(express.static('public'))

app.use('/', homeRouter)

// Error handling middleware
app.use(errorHandling)

if(process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => logger.info(`Listening server on http://localhost:${PORT}`)).on('error', error => {
    logger.error(`Error: ${error.name}, message: ${error.message}`)
    console.log(error.stack)
  })
}

export default app