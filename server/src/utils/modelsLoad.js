const path = require('path')
const { readdirSync } = require('fs')
const modelsDir = path.join(__dirname, '../models')

const modelsLoad = (db) => {
  const modelsToSync = {}

  readdirSync(modelsDir)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file.slice(-3) === '.js'
    })
    .forEach((file) => {
      const model = require(path.join(modelsDir, file))(db)
      modelsToSync[model.name] = model
    })

  return modelsToSync
}

module.exports = { modelsLoad }
