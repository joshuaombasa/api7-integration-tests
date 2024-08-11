const express = require('express')
const Property = require('../models/property')
const propertiesRouter = express.Router()

propertiesRouter.get('/', async (request, response, next) => {
  
  try {
    const properties = await Property.find({})
    response.send(properties)
  } catch (error) {
    next(error)
  }
})

propertiesRouter.get('/:id', async (request, response, next) => {

  try {
    const property = await Property.findById(request.params.id)
    if (!property) {
      return response.status(404).send({ errors: [{ message: 'Not Found' }] })
    }
    response.send(property)
  } catch (error) {
    next(error)
  }
})

propertiesRouter.post('/', async (request, response, next) => {

  const { name, country, price, isAvailable } = request.body

  const propertyObject = new Property({ name, country, price, isAvailable })
  try {
    const savedProperty = await propertyObject.save()
    response.status(201).send(savedProperty)
  } catch (error) {
    next(error)
  }
})

propertiesRouter.put('/:id', async (request, response, next) => {

  const { name, country, price, isAvailable } = request.body
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      request.params.id,
      { name, country, price, isAvailable },
      { new: true }
    )

    response.send(updatedProperty)
  } catch (error) {
    next(error)
  }
})

propertiesRouter.delete('/:id', async (request, response, next) => {

  try {
    await Property.findByIdAndDelete(request.params.id)
    response.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = propertiesRouter