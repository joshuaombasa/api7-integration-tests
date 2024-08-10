const Property = require('../models/property')



const propertyData = [
  {
    "name": "Sunset Villa",
    "country": "Spain",
    "price": 450000,
    "isAvailable": true
  },
  {
    "name": "Mountain Retreat",
    "country": "Switzerland",
    "price": 1200000,
    "isAvailable": false
  },
  {
    "name": "Urban Loft",
    "country": "USA",
    "price": 300000,
    "isAvailable": true
  },
  {
    "name": "Beach House",
    "country": "Australia",
    "price": 850000,
    "isAvailable": false
  },
]

const validProperty = {
  "name": "City Apartment",
  "country": "Canada",
  "price": 500000,
  "isAvailable": true
}



const invalidProperty = {
  "name": "City Apartment",
  "isAvailable": true
}

const propertiesInDb = async () => {
  const properties = await Property.find({})
  const formattedproperties = properties.map(p => p.toJSON())
  return formattedproperties
}



module.exports = { propertyData, propertiesInDb, validProperty, invalidProperty }