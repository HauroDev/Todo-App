const { z } = require('zod')
const { User } = require('../../database/db')
const { ResponseError } = require('../errors')

const UserSchema = z.object({
  username: z
    .string({ description: 'username' })
    .nonempty({ message: 'username is required' }),
  password: z
    .string({ description: 'password' })
    .nonempty({ message: 'password is required' }),
  email: z
    .string({ description: 'email' })
    .email()
    .nonempty({ message: 'email is required' }),
  firstname: z.string({ description: 'firstname' }).optional().nullable(),
  lastname: z.string({ description: 'lastname' }).optional().nullable()
})

const validationUser = (user) => {
  return UserSchema.safeParse(user)
}

const validationPartialUser = (user) => {
  return UserSchema.partial().safeParse(user)
}

const userExists = async (id) => {
  const userFound = await User.findByPk(id, { paranoid: false })

  if (!userFound) {
    throw new ResponseError({ message: 'User not found', status: 404 })
  }
  return userFound
}

module.exports = {
  userExists,
  validationUser,
  validationPartialUser
}
