import { BaseController } from './base.controller'
import { Request, Response } from 'express'
import { CacheRepo } from '../database/repository/cache.repo'
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
}
