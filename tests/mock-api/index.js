import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { resolve } from 'path'
// const routeFile = resolve('tests/mock-api', 'routes', 'index.route.js')
// console.log(routeFile)
import router from './routes/index.route.js'
// import { Low, JSONFile } from 'lowdb'

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
const adapter = new FileSync(resolve('tests/mock-api', 'resource', 'db.json'))
const db = low(adapter)

// Use JSON file for storage
const app = express()
const port = '3000'

// db 넣어주기
app.use((req, res, next) => {
  req['db'] = db
  next()
})

// parse json request body
app.use(express.json())

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// Parse cookie
app.use(cookieParser())

// cors setting
app.use(
  cors({
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'device-remember-token',
      'Access-Control-Allow-Origin',
      'Origin',
      'Accept',
    ],
  }),
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.get('/', (req, res) => {
  res.send('hello mockup server')
})

// router 호출
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
