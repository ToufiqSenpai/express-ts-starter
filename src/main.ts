import express from 'express'
import logger from './utils/logger'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandling from './middlewares/errorHandling'
import authRoute from './routes/auth-route'
import database from './utils/database'
import authenticateUser from "./middlewares/authenticateUser";
import todoRoute from "./routes/todo-route";
import userRoute from "./routes/user-route";
import env from 'dotenv'

env.config()

const PORT = process.env.APP_PORT || 8080

const app = express()

database()

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(cookieParser())

app.use(express.raw({ type: 'image/*' }))

app.use(express.json({ type: 'application/json' }))

app.use('/static', express.static('public'))

app.use('/api/v1/auth', authRoute)

app.use(authenticateUser)

app.use('/api/v1/users', userRoute)

app.use('/api/v1/todos', todoRoute)

// Error handling middleware
app.use(errorHandling)

if(process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => logger.info(`Listening server on http://localhost:${PORT}`)).on('error', error => {
    logger.error(`Error: ${error.name}, message: ${error.message}`)
    console.log(error.stack)
  })
}

export default app