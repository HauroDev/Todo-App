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
    this.app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
      cors({
        origin: (origin, callback) => {
          const originAllowed = [URL_CLIENT_DEVELOPMENT, URL_CLIENT_PRODUCTION]

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
    .use('/api/v1', routerApp)
  }

  static methods() {
    this.app.get('/', (_req, res) => {
      res.send('Hello World!')
    })
  }

  static async connectWithDb({ tryConnection = 5, noLogs = false }) {
    while (tryConnection > 0) {
      try {
        await db.sync({ force: false });
        !noLogs && console.log('database connection successfully\n');
        return;
      } catch (error) {
        !noLogs && console.log('error: ' + error.message + ', retrying in 5 seconds\n');
      }
      tryConnection--;
    }

    throw new Error('database connection failed');
  }

  static start() {
    const url = NODE_ENV === 'production' ? URL_PRODUCTION : URL_DEVELOPMENT

    this.app = express()

    this.connectWithDb()
      .then(() => {
        this.middleware()
        this.methods()
      })
      .catch((error) => console.error(error.message))
      .finally(() => {
        this.app.listen(PORT, () => {
          let message = 'Server is running'

          message += NODE_ENV === 'production' ? '.' : ` on port ${PORT}.`

          console.log(message)
          console.log(`url: ${url}`)
          console.log('Press Ctrl+C to stop')
        })
      })
  }
}

Server.start()
