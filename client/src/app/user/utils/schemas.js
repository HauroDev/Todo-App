import { z } from 'zod'

export const UsernameEmailSchema = z.object({
  id_user: z.string().uuid({ message: 'id_user debería ser de formato uuid' }),
  username: z
    .string()
    .regex(/^[A-Za-z0-9_-]+$/, { message: 'no debe contener espacios' })
    .nonempty({ message: 'falta su nombre de usuario' }),
  email: z
    .string()
    .email({ message: 'formato no válido de correo' })
    .nonempty({ message: 'falta su email' })
})

export const nameSchema = z.object({
  id_user: z.string().uuid({ message: 'id_user debería ser de formato uuid' }),
  firstname: z.string(),
  lastname: z.string()
})

export const PasswordSchema = z.object({
  id_user: z.string().uuid({ message: 'id_user debería ser de formato uuid' }),
  password: z
    .string()
    .min(8, { message: 'la contraseña debe tener al menos 8 caracteres' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
      message:
        'la contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
    })
    .refine((value) => value.trim() !== '', {
      message: 'la contraseña no debe estar vacía'
    }),
  passwordConfirmation: z.string().refine(
    (value, data) => {
      if (data.password) {
        return value === data.password
      }
      return true
    },
    {
      message: 'La contraseña no coincide con la confirmación'
    }
  )
})
