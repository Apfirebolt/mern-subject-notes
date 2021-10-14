import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/error-handler.js'

// import routes
import authRoutes from './routes/auth-routes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Success' })
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "API for Subject Notes App in Express and React",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Apfirebolt",
        url: "http://apgiiit.com",
        email: "aspper@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api/auth",
      },
    ],
  },
  apis: ["./routes/auth-routes.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
