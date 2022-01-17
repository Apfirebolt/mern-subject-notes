import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors';
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/error-handler.js'

// import routes
import authRoutes from './routes/auth-routes.js'
import subjectRoutes from './routes/subject-routes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/subjects', subjectRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Success' })
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
