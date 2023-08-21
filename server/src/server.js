const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { db } = require('./db')
const { PORT } = require('./config')

const routerApp = require('./router')
const cookieParser = require('cookie-parser')

class Server {
  static middlewares() {
    this.app.disable('x-powered-by')

    this.app.use(morgan('dev'))

    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
    this.app.use('/api/v1', routerApp)
  }

  static methods() {
    this.app.get('/', (_req, res) => {
      res.send('Hello World!')
    })
  }

  static async connectWithdb() {
    try {
      await db.sync()
      console.log('database connection successfully\n')
    } catch (error) {
      console.log(error)
    }
  }

  static start() {
    this.app = express()

    this.connectWithdb()
      .then(() => {
        this.middlewares()
        this.methods()
        this.app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`)
          console.log(`url: http://localhost:${PORT}`)
          console.log('Press Ctrl+C to stop')
        })
      })
      .catch((error) => console.error(error))
  }
}

Server.start()
