const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true }
})

propertySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})


module.exports = mongoose.model('Property', propertySchema)