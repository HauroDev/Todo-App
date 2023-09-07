const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { db } = require('./db')
const {
  PORT,
  URL_CLIENT_DEVELOPMENT,
  URL_CLIENT_PRODUCTION,
  NODE_ENV,
  URL_PRODUCTION,
  URL_DEVELOPMENT
} = require('./config')

const routerApp = require('./router')

class Server {
  static middleware() {
    this.app.disable('x-powered-by')

    this.app.use(morgan('dev'))

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    const originAllowed = [URL_CLIENT_DEVELOPMENT, URL_CLIENT_PRODUCTION]

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true)
          if (originAllowed.indexOf(origin) === -1) {
            const msg =
              'The CORS policy for this site does not allow access from the specified Origin.'
            return callback(new Error(msg), false)
          }
          return callback(null, true)
        }
      })
    )
    this.app.use('/api/v1', routerApp)
  }

  static methods() {
    this.app.get('/', (_req, res) => {
      res.send('Hello World!')
    })
  }

  static async connectWithDb() {
    try {
      await db.sync({ force: false })
      console.log('database connection successfully\n')
    } catch (error) {
      console.log(error)
    }
  }

  static start() {
    const url = NODE_ENV === 'production' ? URL_PRODUCTION : URL_DEVELOPMENT

    this.app = express()

    this.connectWithDb()
      .then(() => {
        this.middleware()
        this.methods()
        this.app.listen(PORT, () => {
          let message = 'Server is running'

          message += NODE_ENV === 'production' ? '.' : ` on port ${PORT}.`

          console.log(message)
          console.log(`url: ${url}`)
          console.log('Press Ctrl+C to stop')
        })
      })
      .catch((error) => console.error(error))
  }
}

Server.start()
