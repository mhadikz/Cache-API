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

   it('The endpoint returns error for key', async () => {
      const result = await request.post('/api/v1/cache/upsert').send({
         value: {
            webTitle: 'NASA',
            redirectUrl: 'nasa.gov'
         }
      })
      expect(result.statusCode).toEqual(400)
      expect(result.body.message).toStrictEqual('Key is required.')
   })

   it('The endpoint returns error for value', async () => {
      const result = await request.post('/api/v1/cache/upsert').send({
         key: 'key-test-3'
      })
      expect(result.statusCode).toEqual(400)
      expect(result.body.message).toStrictEqual('Value is required.')
   })

   it('The endpoint creates data successfully', async () => {
      const result = await request.post('/api/v1/cache/upsert').send({
         key: 'key-test-3',
         value: {
            webTitle: 'NASA',
            redirectUrl: 'nasa.gov'
         }
      })
      expect(result.statusCode).toEqual(200)
      expect(result.body.message).toStrictEqual('Data is ready.')
   })

   it('The endpoint updates data successfully', async () => {
      const result = await request.post('/api/v1/cache/upsert').send({
         key: 'key-test-2',
         value: 'TTTEEESSSTTT'
      })
      expect(result.statusCode).toEqual(200)
      expect(result.body.result.value).toStrictEqual('TTTEEESSSTTT')
   })
})
