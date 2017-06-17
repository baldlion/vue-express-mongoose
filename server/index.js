import 'babel-polyfill'
import express from 'express'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import session from 'express-session'
import socketIO from 'socket.io'
import http from 'http'
import clear from 'clear'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import sockets from './sockets'
import devServer from './dev-server'
import router from './router'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const env = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
const io = socketIO(server)

app.locals.production = env === 'production'

mongoose.Promise = bluebird
mongoose.connect(process.env.MONGODB_URI)

app.set('views', './server/views')
app.set('view engine', 'hbs')

app.use(bodyParser.json({limit: '60mb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '60mb'}))
app.use(session({secret: process.env.SESSION_SECRET}))

if (env === 'production') {
  app.use(express.static('./dist/app'))
}

app.use(express.static('./content'))

if (env === 'development') {
  devServer(app)
}

router(app, io)

// sockets(io)

setTimeout(() => {
  io.emit('foo', 'fooooo')
}, 10000)

server.listen(PORT, () => {
  if (env === 'production') {
    clear()
    console.log('\n' + chalk.bold.bgCyan(' SUCCESS ') + chalk.bold.cyan(` Production server listening on port ${process.env.PORT} `))
  }
})
