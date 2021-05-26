const sequelize = require("../models");
const User = sequelize.models.user;
const validator = require('validator')

async function getUserById(id) {
  let user = await User.findOne({where: {id}})
  if (user === undefined || user === null) {
    return null;
  }
  return user.dataValues
}

async function getUserByGoogleId(id) {
  let user = await User.findOne({where: {googleId: id}})
  if (user === undefined || user === null) {
    return null;
  }
  return user.dataValues
}

async function updateUser(id, params) {
  let allowedFields = ['username', 'email']
  Object.keys(params).forEach(key => {
    if (allowedFields.indexOf(key) === -1) {
      throw `Illegal field "${key}"`
    }
  })
  if (Object.keys(params).indexOf('email') !== -1)
    if (!validator.isEmail(params['email'])) {
      throw {message:"Invalid email"}
    }
  if (Object.keys(params).indexOf('username') !== -1)
    if (!validator.isLength(params['username'], 5, 50)) {
      throw {message:"Invalid username"}
    }
  let user = await User.findOne({where: {id}})
  user = await user.update(params)
  return user.dataValues
}

async function createUser(params) {
  let allowedFields = ['username', 'email', 'googleId']
  Object.keys(params).forEach(key => {
    if (allowedFields.indexOf(key) === -1) {
      throw {message:`Illegal field "${key}"`}
    }
  })
  if (!validator.isEmail(params['email'])) {
    throw {message:"Invalid email"}
  }
  if (!validator.isLength(params['username'], 5, 50)) {
    throw {message:"Invalid username"}
  }

  let user = await User.create(params)
  return user.dataValues
}

module.exports = {
  getUserById,
  updateUser,
  createUser,
  getUserByGoogleId
}
