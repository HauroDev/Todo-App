const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { db } = require('./src/db')
const { PORT } = require('./src/config')

const routerApp = require('./src/router')

class Server {
  static middleware() {
    this.app.disable('x-powered-by')

    this.app.use(morgan('dev'))

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.app.use(cors({ origin: 'http://localhost:5173' }))
    this.app.use('/api/v1', routerApp)
  }

  static methods() {
    this.app.get('/', (_req, res) => {
      res.send('Hello World!')
    })
  }

  static async connectWithdb() {
    try {
      await db.sync({ force: false })
      console.log('database connection successfully\n')
    } catch (error) {
      console.log(error)
    }
  }

  static start() {
    this.app = express()

    this.connectWithdb()
      .then(() => {
        this.middleware()
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
