const { Sequelize } = require('sequelize')
const { PG_NAME, PG_USER, PG_PASS, PG_HOST } = require('./config')
const { modelsLoad } = require('./utils/modelsLoad')

const db = new Sequelize(PG_NAME, PG_USER, PG_PASS, {
  dialect: 'postgres',
  host: PG_HOST,
  logging: console.log
})

db.models = modelsLoad(db)

const { User, Group, List, Task, Tag } = db.models
// Users has many groups
User.hasMany(Group, {
  foreignKey: 'id_user',
  as: 'groups'
})
Group.belongsTo(User, {
  foreignKey: 'id_user'
})
// Users has many lists
User.hasMany(List, {
  foreignKey: 'id_user',
  as: 'lists'
})
List.belongsTo(User, {
  foreignKey: 'id_user'
})
// Users has many tasks
User.hasMany(Task, {
  foreignKey: 'id_user',
  as: 'tasks'
})
Task.belongsTo(User, {
  foreignKey: 'id_user'
})
// Groups has one list
Group.hasMany(List, {
  foreignKey: 'id_group',
  as: 'lists'
})
List.belongsTo(Group, {
  foreignKey: 'id_group'
})
// Groups has many tasks
Group.hasMany(Task, {
  foreignKey: 'id_group',
  as: 'tasks'
})
Task.belongsTo(Group, {
  foreignKey: 'id_group'
})
// List has many tasks
List.hasMany(Task, {
  foreignKey: 'id_list',
  as: 'tasks'
})
Task.belongsTo(List, {
  foreignKey: 'id_list'
})
// tasks has many tags and tags has many tasks
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
