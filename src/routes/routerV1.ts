import express from 'express'
const router = express.Router()
import cacheRouter from './cache.router'

router.use('/cache', cacheRouter)

export default router
