const mongoose = require('mongoose')
const Property = require('../models/property')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./helper')
const api = supertest(app)

beforeEach(async () => {
  await Property.deleteMany({})
  
  for (let property of helper.propertyData) {
    const propertyObject = new Property(property)
    await propertyObject.save()
  }

})

describe('When there are some properties stored ', () => {

  test('properties are returned as JSON', async () => {
    await api.get('/api/properties')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all properties are returned', async () => {
    const response = await api.get('/api/properties')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.propertyData.length)
  })

  test('a specific property is among the returned properties', async () => {
    const response = await api.get('/api/properties')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const names = response.body.map(p => p.name)
    expect(names).toContain(helper.propertyData[0].name)
  })

})


describe('fetching a spacific property', () => {

  test('succeeds with status code 200 when given a validId', async () => {
    const propertiesInDb = await helper.propertiesInDb()
    const response = await api.get(`/api/properties/${propertiesInDb[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with status code 400 when given an invalidId', async () => {
    const response = await api.get(`/api/properties/32576095`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with status code 404 when given an nonExistent Id', async () => {
    const response = await api.get(`/api/properties/66a3c5c3261b345a13bdda36`)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })

})


describe('addition of a new property', () => {

  test('succeeds when given valid data', async () => {
    const propertiesInDbAtStart = await helper.propertiesInDb()
    const response = await api.post(`/api/properties/`)
      .expect(201)
      .send(helper.validProperty)
      .expect('Content-Type', /application\/json/)
      const propertiesInDbAtEnd = await helper.propertiesInDb()
      expect(propertiesInDbAtEnd).toHaveLength(propertiesInDbAtStart.length + 1)
  })

  test('fails with status code 400 when given an invalid Property', async () => {
    const propertiesInDbAtStart = await helper.propertiesInDb()
    const response = await api.post(`/api/properties/`)
      .expect(400)
      .send(helper.invalidProperty)
      .expect('Content-Type', /application\/json/)
      const propertiesInDbAtEnd = await helper.propertiesInDb()
      expect(propertiesInDbAtEnd).toHaveLength(propertiesInDbAtStart.length)
  })

})

describe('Deleting a property', () => {

  test('succeeds when given a valid ID', async () => {
    const propertiesInDb = await helper.propertiesInDb()
    const response = await api.delete(`/api/properties/${propertiesInDb[0].id}`)
      .expect(204)
      const propertiesInDbAtEnd = await helper.propertiesInDb()
      expect(propertiesInDbAtEnd).toHaveLength(propertiesInDb.length - 1)
  })
  
})


afterAll(async () => {
  await mongoose.connection.close()
})