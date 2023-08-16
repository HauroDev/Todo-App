const { z } = require('zod')
const ListSchema = z.object({
  title: z.string().nonempty({ message: 'title is required' }),
  description: z.string().optional(),
  id_user: z
    .string()
    .uuid({ message: 'id_user needs to be in UUID format.' })
    .nonempty({ message: 'id_user is required' }),
  id_group: z.number().optional()
})

const validationList = (list) => {
  return ListSchema.safeParse(list)
}

const validationPartialList = (list) => {
  return ListSchema.partial().safeParse(list)
}

module.exports = {
  validationList,
  validationPartialList
}
