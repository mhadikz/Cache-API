import { BaseController } from './base.controller'
import { Request, Response } from 'express'
import { CacheRepo } from '../database/repository/cache.repo'
import cacheModel, { ICache } from '../database/schema/cache.schema'
const repo = new CacheRepo()

/**
 * Class to manage Cache data
 */
export class CacheController extends BaseController {
   constructor() {
      super()
   }

   /**
    * This method returns cached data or creates a random string if the key doesn't exist
    * @param  {Request} req
    * @param  {Response} res
    */
   async getCacheData(req: Request, res: Response) {
      try {
         const key = req.params.key

         if (!key) return super.badRequest(res, 'Key is required.')

         const result = await repo.getData(key)
         return super.ok(res, 'Data was created.', result)
      } catch (error) {
         return super.fail(res, error)
      }
   }

   /**
    * This method returns all cached data
    * @param  {Request} req
    * @param  {Response} res
    */
   async getAllCachedData(req: Request, res: Response) {
      try {
         const result = await repo.getAllData()
         return super.ok(res, 'Keys are ready.', result)
      } catch (error) {
         return super.fail(res, error)
      }
   }

   /**
    * This method creates or updates data
    * @param  {Request} req
    * @param  {Response} res
    */
   async upsertData(req: Request, res: Response) {
      try {
         const body = req.body

         if (!body.key) return super.badRequest(res, 'Key is required.')
         if (!body.value) return super.badRequest(res, 'value is required.')

         const cacheData = <ICache>body
         const result = await repo.createOrUpdateData(cacheData)

         return super.ok(res, 'Data is ready.', result)
      } catch (error) {
         return super.fail(res, error)
      }
   }
}
