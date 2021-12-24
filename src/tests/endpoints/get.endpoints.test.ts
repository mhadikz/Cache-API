import app from '../../app'
import mongoose from 'mongoose'
import supertest from 'supertest'
const request = supertest(app)
import { dbAddress, dbNameTest } from '../../configs/env'
import model from '../../database/schema/cache.schema'
import { mocks } from '../__mocks__/cache.mocks'

describe('Test the get endpoints', () => {
   beforeAll(async () => {
      /**
       * Make a connection for the test environment
       */
      await mongoose.connect(`${dbAddress()}${dbNameTest()}`)

      /**
       * Insert fake data to the database to Read, Update and Delete operations
       */
      await model.insertMany(mocks)
   })

   afterAll(async () => {
      /**
       * Delete mock data from the database
       */
      await model.deleteMany()

      /**
       * Close the Mongoose connection
       */
      await mongoose.connection.close()
   })

   it('The endpoint returns data', async () => {
      const result = await request.get('/api/v1/cache/key-test-1')
      expect(result.statusCode).toEqual(200)
      expect(result.body.result.key).toStrictEqual('key-test-1')
      expect(result.body.result.value).toStrictEqual({
         webTitle: 'test-title',
         redirectUrl: 'google.com'
      })
   })

   it('The endpoint returns data', async () => {
      const result = await request.get('/api/v1/cache/key-test-ttl')
      expect(result.statusCode).toEqual(200)
      expect(result.body.result.key).toStrictEqual('key-test-ttl')
      expect(result.body.result.value).not.toEqual('TTL-Value-Test')
      expect(result.body.result.ttl).toBeGreaterThan(1637589044000)
   })

   it('The endpoint returns all data', async () => {
      const result = await request.get('/api/v1/cache/')
      expect(result.statusCode).toEqual(200)
      expect(result.body.result.length).toBeGreaterThan(1)
   })

   it('The endpoint creates random data', async () => {
      const result = await request.get('/api/v1/cache/key-does-not-exist')
      expect(result.statusCode).toEqual(200)
      expect(result.body.result.value).toBeDefined()
   })
})
