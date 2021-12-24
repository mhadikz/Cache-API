import express from 'express'
const app = express()
import { Database } from './configs/database'
import { nodeEnv } from './configs/env'

if (nodeEnv() !== 'test') {
   Database.getInstance()
}

app.use(express.json())


export default app
