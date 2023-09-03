import { z } from 'zod'

export const statusSchema = z
  .enum(['completed', 'in progress', 'pending'])
  .default('pending')

export const taskSchema = z.object({
  status: statusSchema,
  title: z.string().nonempty({ message: 'el titulo es necesario' }),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        label: z.string().nonempty(),
        status: statusSchema
      })
    )
    .optional(),
  id_user: z
    .string()
    .uuid({ message: 'id_user needs to be in UUID format' })
    .nonempty({ message: 'id_user is required' })
})

export const taskDetailSchema = z.object({
  id_task: z.number().nonnegative({ message: 'id_task no puede ser negativo' }),
  status: statusSchema,
  title: z.string().nonempty({ message: 'el titulo es necesario' }),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        label: z.string().nonempty(),
        status: statusSchema
      })
    )
    .optional(),
  id_user: z.string().nonempty({ message: 'id_user is required' })
})
