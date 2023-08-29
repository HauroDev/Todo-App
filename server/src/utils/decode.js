const bcrypt = require('bcrypt')
const { SALT_OR_ROUNDS } = require('../config')

const encrypt = async (data) => {
  return await bcrypt.hash(data, SALT_OR_ROUNDS)
}

const compare = async (data, comparison) => {
  return await bcrypt.compare(data, comparison)
}

module.exports = {
  encrypt,
  compare
}
