import app from './app'
import { port } from './configs/env'

const server = app.listen(port(), () => {
   console.log(`We have been launched on port: ${port()}.`)
})

module.exports = server
