import app from '../../app'
import mongoose from 'mongoose'
import supertest from 'supertest'
const request = supertest(app)
import { dbAddress, dbNameTest } from '../../configs/env'
import model from '../../database/schema/cache.schema'
import { mocks } from '../__mocks__/cache.mocks'

describe('Test the post endpoints', () => {
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

   it('The endpoint returns not found for key', async () => {
      const result = await request.delete('/api/v1/cache/fake-key')
      expect(result.statusCode).toEqual(404)
   })

   it('The endpoint removes the cached data successfully', async () => {
      const result = await request.delete('/api/v1/cache/key-test-1')
      expect(result.statusCode).toEqual(200)
      expect(result.body.message).toStrictEqual('Data was removed.')
   })

   it('The endpoint removes all cached data successfully', async () => {
      const result = await request.delete('/api/v1/cache/remove-all-data')
      expect(result.statusCode).toEqual(200)
      expect(result.body.message).toStrictEqual('Data were removed.')
   })

   it('The endpoint returns database is empty', async () => {
      const result = await request.delete('/api/v1/cache/remove-all-data')
      expect(result.statusCode).toEqual(404)
      expect(result.body.message).toStrictEqual('Cache is already empty.')
   })
})
