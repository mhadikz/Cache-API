import mongoose from 'mongoose'
import { dbAddress, dbName } from './env'

/**
 * Class to get an instance from the database
 */
export class Database {
   private static instance: Database

   /**
    * This method is trying to connect the database
    * @param {String} dbAddress Our local or server address of the database
    * @param {String} dbName Selected name for the database in env variables
    */
   constructor() {
      mongoose.connect(`${dbAddress()}${dbName()}`)

      const db = mongoose.connection

      db.on('error', console.error.bind(console, 'MongoDB connection error:'))
      db.on(
         'open',
         console.error.bind(console, 'MongoDB database connection established successfully')
      )
   }
   /**
    * Get an instance from the database for starting the connection
    * @returns {Database} An instance of the database
    */
   public static getInstance(): Database {
      if (!Database.instance) {
         Database.instance = new Database()
      }

      return Database.instance
   }
}
