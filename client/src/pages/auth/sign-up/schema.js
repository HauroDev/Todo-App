import { z } from 'zod'

export const signUpSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: 'falta su nombre de usuario' })
      .regex(/^[A-Za-z0-9_-]+$/, { message: 'no debe contener espacios' }),
    password: z.string().nonempty({ message: 'falta su contraseña' }),
    passwordConfirmation: z
      .string()
      .nonempty({ message: 'falta su confirmacion de contraseña' }),
    email: z
      .string()
      .email({ message: 'formato no valido de correo' })
      .nonempty({ message: 'falta su email' }),
    firstname: z
      .string()
      .nonempty({ message: 'ingrese su\\s nombre\\s' })
      .regex(/^[A-Za-zá-úÁ-ÚüÜñÑ]+(?: [A-Za-zá-úÁ-ÚüÜñÑ]+)?$/g, {
        message: 'Solo caracteres alfabéticos'
      }),
    lastname: z
      .string()
      .nonempty({ message: 'ingrese su apellido' })
      .regex(/^[A-Za-zá-úÁ-ÚüÜñÑ]+(?: [A-Za-zá-úÁ-ÚüÜñÑ]+)?$/g, {
        message: 'Solo caracteres alfabéticos'
      })
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation
    },
    {
      path: ['passwordConfirmation'],
      message: 'La contraseña no coincide'
    }
  )
