import express from 'express'
const app = express()
import { Database } from './configs/database'
import { nodeEnv } from './configs/env'
import routerV1 from './routes/routerV1'

if (nodeEnv() !== 'test') {
   Database.getInstance()
}

app.use(express.json())

app.use('/api/v1', routerV1)

export default app
