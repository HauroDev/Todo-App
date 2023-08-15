const { z } = require('zod')
const GroupSchema = z.object({
  title: z.string().nonempty({ message: 'title is required' }),
  description: z.string().optional()
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
