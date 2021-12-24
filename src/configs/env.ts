require('dotenv').config()

export function dbAddress() {
   return process.env.DB_ADDRESS
}

export function dbName() {
   return process.env.DB_NAME
}

export function dbNameTest() {
   return process.env.DB_NAME_TEST
}

export function port() {
   return process.env.PORT
}

export function nodeEnv() {
   return process.env.NODE_ENV
}
