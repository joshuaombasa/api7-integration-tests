const logger = require('./logger')


const requestLogger = (request, response, next) => {
  logger.info('PATH:', request.path)
  logger.info('METHOD:', request.method)
  logger.info('BODY:', request.body)
  logger.info('___')
  next()
}

const unknownEndpointHandler = (request, response, next) => {
  return response.status(404).send({ errors: [{ message: 'Unknown endpoint' }] })
}


const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ errors: [{ message: error.message }] })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ errors: [{ message: error.message }] })
  }
  next()

  // response.status(400).send({ errors: [{ message: 'Something wet wrong' }] })
}


module.exports = { requestLogger, unknownEndpointHandler, errorHandler }