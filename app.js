const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const propertiesRouter = require('./controllers/properties')
const cors = require('cors')

const app = express()


mongoose.connect(config.MONGO_URI)
  .then(() => logger.info('Connected to MONGODB'))
  .catch(error => logger.error(error))

app.use(express.json())

app.use(cors())

app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/properties', propertiesRouter)

app.use(middleware.unknownEndpointHandler)
app.use(middleware.errorHandler)


module.exports = app