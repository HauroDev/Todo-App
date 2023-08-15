const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Task extends Model {}

  Task.init(
    {
      id_task: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.ENUM('completed', 'in progress', 'pending'),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSON()),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      paranoid: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true
    }
  )

  return Task
}
