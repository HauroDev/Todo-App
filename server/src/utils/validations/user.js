const { z } = require('zod')

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
  return UserSchema.partial({
    email: true,
    password: true,
    username: true
  }).safeParse(user)
}

module.exports = {
  validationUser,
  validationPartialUser
}
