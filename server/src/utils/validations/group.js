const { z } = require('zod')
const GroupSchema = z.object({
  title: z.string().nonempty({ message: 'title is required' }),
  description: z.string().optional(),
  id_user: z
    .string()
    .uuid({ message: 'id_user needs to be in UUID format.' })
    .nonempty({ message: 'id_user is required' })
})

const validationGroup = (group) => {
  return GroupSchema.safeParse(group)
}

const validationPartialGroup = (group) => {
  return GroupSchema.partial().safeParse(group)
}

module.exports = {
  validationGroup,
  validationPartialGroup
}
