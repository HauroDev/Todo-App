import { z } from 'zod'
export const taskSchema = z.object({
  status: z.enum(['completed', 'in progress', 'pending']).default('pending'),
  title: z.string().nonempty({ message: 'el titulo es necesario' }),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        label: z.string().nonempty(),
        status: z.enum(['completed', 'pending']).default('pending')
      })
    )
    .optional(),
  id_user: z
    .string()
    .uuid({ message: 'id_user needs to be in UUID format' })
    .nonempty({ message: 'id_user is required' })
})
