const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class List extends Model {}

  List.init(
    {
      id_list: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
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
      modelName: 'List',
      tableName: 'lists',
      paranoid: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true
    }
  )

  return List
}
