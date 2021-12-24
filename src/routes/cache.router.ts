import express from 'express'
const router = express.Router()
import { CacheController } from '../controllers/cache.controller'

const controller = new CacheController()

router.get('/:key', controller.getCacheData)

router.get('/', controller.getAllCachedData)

export default router
