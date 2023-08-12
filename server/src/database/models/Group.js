const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Group extends Model {}

  Group.init(
    {
      id_group: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      paranoid: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true
    }
  )

  return Group
}
