import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/connectDB.js'

//Routes
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.use('/api/v1/users', userRoutes)

//Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
