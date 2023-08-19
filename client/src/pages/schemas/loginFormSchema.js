import { z } from 'zod'

export const LoginFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: 'falta el nombre de usuario' })
    .regex(/^[A-Za-z0-9_-]+$/, { message: 'no incluir espacio' }),
  password: z.string().nonempty({ message: 'falta la contraseña' })
})

export const SignUpFormSchema = z.object({
  username: z.string().nonempty({ message: 'username required' }).nullable(),
  email: z.string().nonempty({ message: 'email required' }).nullable(),
  password: z.string().nonempty({ message: 'password required' })
})

export const LoginFormatRequest = (credentials) => {
  return LoginFormSchema.partial().safeParse(credentials)
}
