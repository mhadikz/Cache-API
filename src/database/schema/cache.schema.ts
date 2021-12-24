import { Schema, Document, model } from 'mongoose'
import { getTimeInMilliseconds } from '../../helpers/date.helper'

export interface ICache extends Document {
   key: string
   value: any
   ttl: number
   createdAt: number
}

const cacheSchema = new Schema(
   {
      key: { type: String, required: true },
      value: { type: Object, required: true },
      ttl: { type: Number, default: getTimeInMilliseconds(20), required: true },
      createdAt: { type: Number, default: new Date().getTime(), required: true }
   },
   { collection: 'Cache' }
)

const cacheModel = model<ICache>('Cache', cacheSchema)

export default cacheModel
