const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { db } = require('./database/db')
const { PORT } = require('./config')

const routerApp = require('./routers/router')

class Server {
  constructor () {
    this.app = express()

    this.connectWithdb()
      .then(() => {
        this.middlewares()
        this.methods()
      })
      .catch((error) => console.error(error))
  }

  middlewares () {
    this.app.disable('x-powered-by')
    this.app.use(morgan('dev'))
    this.app.use(cors({ origin: '*' }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use('/api/v1', routerApp)
  }

  methods () {
    this.app.get('/', (_req, res) => {
      res.send('Hello World!')
    })
  }

  async connectWithdb () {
    try {
      await db.sync()
      console.log('database connection successfully')
    } catch (error) {
      console.log(error)
    }
  }

  start () {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log('url: http://localhost:' + PORT)
      console.log('Press Ctrl+C to stop\n')
    })
  }
}

const server = new Server()

server.start()
