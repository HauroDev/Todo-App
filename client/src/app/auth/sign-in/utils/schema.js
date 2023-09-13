import { z } from 'zod'

export const SignInSchema = z.object({
  username: z
    .string()
    .nonempty({ message: 'falta el nombre de usuario' })
    .regex(/^[A-Za-z0-9_-]+$/, { message: 'no debe incluir espacio' }),
  password: z.string().nonempty({ message: 'falta la contraseña' })
})
