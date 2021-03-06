import express from 'express'
const router = express.Router()
import { CacheController } from '../controllers/cache.controller'

const controller = new CacheController()

router.get('/:key', controller.getCacheData)
router.get('/', controller.getAllCachedData)


router.post('/upsert', controller.upsertData)

router.delete('/remove-all-data', controller.removeAllCachedData)
router.delete('/:key', controller.removeData)

export default router
