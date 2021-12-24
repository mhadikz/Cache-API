import express from 'express'
const router = express.Router()
import { CacheController } from '../controllers/cache.controller'

const controller = new CacheController()

router.get('/:key', controller.getCacheData)

export default router
