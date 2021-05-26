const sequelize = require("../models");
const Record = sequelize.models.record;
const validator = require('validator')

async function createRecord(params) {
  let allowedFields = ['path', 'trackerId', 'r']
  Object.keys(params).forEach(key => {
    if (allowedFields.indexOf(key) === -1) {
      throw {message: `Illegal field "${key}"`}
    }
  })
  if (!validator.isLength(params['path'], 1, 512))
    throw {message: `Incorrect path`}
  let record = await Record.create(params)
  return record.dataValues
}

module.exports = {
  createRecord
}
