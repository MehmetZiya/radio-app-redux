import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

//import morgan from 'morgan'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/connectDB.js'

//Routes
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)

//Middleware
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})
