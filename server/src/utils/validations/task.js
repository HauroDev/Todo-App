const { z } = require('zod')
const taskSchema = z.object({
  status: z.enum(['completed', 'in progress', 'pending']).default('pending'),
  title: z.string().nonempty({ message: 'title is required' }),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        label: z.string({ message: 'label is required' }),
        status: z.enum(['completed', 'pending']).default('pending')
      })
    )
    .optional()
})

const validationTask = (task) => {
  return taskSchema.safeParse(task)
}

const validationPartialTask = (task) => {
  return taskSchema.partial().safeParse(task)
}

module.exports = {
  validationTask,
  validationPartialTask
}
