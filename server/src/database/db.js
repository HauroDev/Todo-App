const { Sequelize } = require('sequelize')
const { PG_NAME, PG_USER, PG_PASS, PG_HOST } = require('../config')
const { readdirSync } = require('fs')
const path = require('path')
const modelsDir = path.join(__dirname, 'models')

const db = new Sequelize(PG_NAME, PG_USER, (PG_PASS), {
  dialect: 'postgres',
  host: PG_HOST,
  logging: console.log
})

const modelsToSync = {}

readdirSync(modelsDir)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file.slice(-3) === '.js'
  })
  .forEach((file) => {
    const model = require(path.join(modelsDir, file))(db)
    modelsToSync[model.name] = model
  })

db.models = modelsToSync

const { User, Group, List, Task, Tag } = db.models

User.hasMany(Group)
Group.belongsTo(User)

User.hasMany(List)
List.belongsTo(User)

Group.hasOne(List)
List.belongsTo(Group)

List.hasMany(Task)
Task.belongsTo(List)

Task.belongsToMany(Tag, { through: 'Task_Tags', foreignKey: 'id_tag' })
Tag.belongsToMany(Task, { through: 'Task_Tags', foreignKey: 'id_task' })

module.exports = {
  db,
  User,
  Group,
  List,
  Task,
  Tag,
  ...db.models
}
