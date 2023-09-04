const { Sequelize } = require('sequelize')
const { PG_NAME, PG_USER, PG_PASS, PG_HOST, NODE_ENV } = require('./config')
const { modelsLoad } = require('./utils/modelsLoad')

const optionsSequelize = {
  dialect: 'postgres',
  host: PG_HOST,
  logging: NODE_ENV === 'production' ? null : console.log,
  dialectOptions: NODE_ENV === 'production' ? { ssl: true } : undefined
}

const db = new Sequelize(PG_NAME, PG_USER, PG_PASS, optionsSequelize)

db.models = modelsLoad(db)

const { User, Task } = db.models

User.hasMany(Task, {
  foreignKey: 'id_user',
  as: 'tasks'
})
Task.belongsTo(User, {
  foreignKey: 'id_user'
})

module.exports = {
  db,
  User,
  Task,
  ...db.models
}
