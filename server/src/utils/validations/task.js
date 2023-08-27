const { z } = require('zod')
const TaskSchema = z.object({
  status: z.enum(['completed', 'in progress', 'pending']).default('pending'),
  title: z.string().nonempty({ message: 'title is required' }),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        label: z.string().nonempty({ message: 'label is required' }),
        status: z
          .enum(['completed', 'in progress', 'pending'])
          .default('pending')
      })
    )
    .optional(),
  // id_list: z.number(),
  // id_group: z.number().optional(),
  id_user: z
    .string()
    .uuid({ message: 'id_user needs to be in UUID format' })
    .nonempty({ message: 'id_user is required' })
})

const validationTask = (task) => {
  return TaskSchema.safeParse(task)
}

const validationPartialTask = (task) => {
  return TaskSchema.partial().safeParse(task)
}

module.exports = {
  validationTask,
  validationPartialTask
}
