const { z } = require('zod')

const UserSchema = z.object({
  username: z.string().nonempty({ message: 'username is required' }),
  password: z.string().nonempty({ message: 'password is required' }),
  email: z.string().email().nonempty({ message: 'email is required' }),
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable()
})

const validationUser = (user) => {
  return UserSchema.safeParse(user)
}

const validationPartialUser = (user) => {
  return UserSchema.partial({ email: true }).safeParse(user)
}

module.exports = {
  validationUser,
  validationPartialUser
}
