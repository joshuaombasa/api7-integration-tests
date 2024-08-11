const express = require('express')
const User = require('../models/user')
const usersRouter = express.Router()

usersRouter.get('/', async (request, response, next) => {

  try {
    const users = await User.find({})
    response.send(users)
  } catch (error) {
    next(error)
  }
})


usersRouter.get('/:id', async (request, response, next) => {

  try {
    const user = await User.findById(request.params.id)

    if (!user) {
      return response.status(404).send({ errors: [{ message: 'Not Found' }] })
    }

    response.send(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {

  const { email, password } = request.body

  try {
    const userObject = new User({ email, password })
    const savedUser = await userObject.save()
    response.status(201).send(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.put('/:id', async (request, response, next) => {
  
  const { email, password } = request.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { email, password },
      { new: true }
    )

    response.send(updatedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {

  try {
    await User.findByIdAndDelete(request.params.id)
    response.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter

