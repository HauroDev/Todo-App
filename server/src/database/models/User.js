const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      id_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      firstname: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      lastname: {
        type: DataTypes.STRING(64),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true
    }
  )

  return User
}
