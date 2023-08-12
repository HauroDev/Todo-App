const { Sequelize } = require('sequelize')
const { PG_NAME, PG_USER, PG_PASS, PG_HOST } = require('../config')
const { readdirSync } = require('fs')
const path = require('path')
const modelsDir = path.join(__dirname, 'models')

const db = new Sequelize(PG_NAME, PG_USER, PG_PASS, {
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

User.hasMany(Group, {
  foreignKey: 'id_user',
  as: 'groups'
})

Group.belongsTo(User, {
  foreignKey: 'id_user'
})

User.hasMany(List, {
  foreignKey: 'id_user',
  as: 'lists'
})

List.belongsTo(User, {
  foreignKey: 'id_user'
})

Group.hasOne(List, {
  foreignKey: 'id_group',
  as: 'list'
})

List.belongsTo(Group, {
  foreignKey: 'id_group'
})

List.hasMany(Task, {
  foreignKey: 'id_list',
  as: 'tasks'
})

Task.belongsTo(List, {
  foreignKey: 'id_list'
})

Task.belongsToMany(Tag, {
  through: 'Task_Tags',
  foreignKey: 'id_task',
  otherKey: 'id_tag'
})

Tag.belongsToMany(Task, {
  through: 'Task_Tags',
  foreignKey: 'id_tag',
  otherKey: 'id_task'
})

module.exports = {
  db,
  User,
  Group,
  List,
  Task,
  Tag,
  ...db.models
}
