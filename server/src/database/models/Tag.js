const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Task extends Model {}

  Task.init(
    {
      id_tag: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Tag',
      tableName: 'tags',
      paranoid: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true
    }
  )

  return Task
}
