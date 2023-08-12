const { z } = require('zod')
const ListSchema = z.object({
  title: z.string().nonempty({ message: 'title is required' }),
  description: z.string().optional()
})

const validationList = (list) => {
  return ListSchema.safeParse(list)
}

const validationPartialList = (list) => {
  return ListSchema.partial({ description: true }).safeParse(list)
}

module.exports = {
  validationList,
  validationPartialList
}
