import { Response } from 'express'

/**
 * Class to extend by controllers for having required methods
 */
export class BaseController {
   /**
    * A general function for preparing the response in different status
    * @param  {Response} res
    * @param  {number} code
    * @param  {string} message
    */
   static jsonResponse(res: Response, code: number, message: string) {
      return res.status(code).json({ error: true, message })
   }

   /**
    * This function will be used when the result of a process is done successfully
    * @param  {Response} res
    * @param  {string} message Set your customized message
    * @param  {T} result? Set it when a function has to return data
    */
   ok<T>(res: Response, message: string, result?: T) {
      if (!!result) {
         res.type('application/json')
         return res.status(200).json({ error: false, message, result })
      } else if (!!message) {
         res.type('application/json')
         return res.status(200).json({ error: false, message })
      } else {
         return res.sendStatus(200)
      }
   }

   /**
    *  Use it when you just want to say something is created and the data doesn't matter
    *
    * @param  {Response} res
    * @param  {string} message Set your customized message
    * @param  {T} result? Set it when a function has to return data
    */
   created(res: Response, message?: string, result?: any) {
      if (!!result) {
         return res.status(201).json({ error: false, message, result })
      } else if (!!message) {
         return res.status(201).json({ error: false, message })
      } else {
         return res.sendStatus(201)
      }
   }

   /**
    * We could use this function when something is sent from the client site with invalid framing
    * @param  {Response} res
    * @param  {string} message? Set your customized message
    */
   badRequest(res: Response, message?: string) {
      return BaseController.jsonResponse(res, 400, message ? message : 'Bad request')
   }

   /**
    * Use this method when we don't have the wanted data in the database
    * @param  {Response} res
    * @param  {string} message? Set your customized message
    */
   notFound(res: Response, message?: string) {
      return BaseController.jsonResponse(res, 404, message ? message : 'Not found')
   }

   /**
    * We could call this method when a conflict occurs among data
    * @param  {Response} res
    * @param  {string} message? Set your customized message
    */
   conflict(res: Response, message?: string) {
      return BaseController.jsonResponse(res, 409, message ? message : 'Conflict')
   }

   /**
    * Use this method when something isn't done successfully in the process
    * @param  {Response} res
    * @param  {Error|string} error Set your message, it could be your or system message
    */
   fail(res: Response, error: any | string) {
      return BaseController.jsonResponse(res, 500, error.toString())
   }
}
