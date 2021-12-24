import { ICacheRepo } from '../di/cache.interface'
import CacheModel, { ICache as Cache } from '../schema/cache.schema'
import randomstring from 'randomstring'

export class CacheRepo implements ICacheRepo {
   constructor() {}

   async getData(key: string): Promise<Cache> {
      try {
         const query = { key: key }

         const data = await CacheModel.findOne(query)

         if (data) {
            console.log('Cache hit')
            return data
         } else {
            console.log('Cache miss')
            const newData = prepareNewData(key)
            return await CacheModel.create(newData)
         }
      } catch (error) {
         throw error
      }
   }

   async getAllData(): Promise<Cache[]> {
      try {
         return await CacheModel.find({ key: { $exists: true } }).select({ key: 1 })
      } catch (error) {
         throw error
      }
   }

   async createOrUpdateData(data: Cache): Promise<Cache> {
      try {
         const query = { key: data.key }
         const options = { upsert: true }

         return await CacheModel.findOneAndUpdate(query, data, options)
      } catch (error) {
         throw error
      }
   }

   removeData(): Promise<Cache> {
      throw new Error('Method not implemented.')
   }

   removeAllData(): Promise<Cache[]> {
      throw new Error('Method not implemented.')
   }
}

function prepareNewData(key: string) {
   const newData = new CacheModel()
   newData.key = key
   newData.value = randomstring.generate()
   return newData
}
