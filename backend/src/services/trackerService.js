const sequelize = require("../models");
const {QueryTypes} = require('sequelize');
const {Op} = require("sequelize");
const Tracker = sequelize.models.tracker;
const Record = sequelize.models.record;
const User = sequelize.models.user;
const validator = require('validator')

async function getTrackerById(id) {
  let tracker = await Tracker.findOne({where: {id}})
  if (tracker === null || tracker === undefined) {
    throw {message: "Tracker not found"}
  }
  let date = new Date();
  date.setDate(date.getDate()-31);
  const statistics = await sequelize.query(
    `SELECT "path", count("path") as viewcount
         FROM records
         WHERE "trackerId"=(?) AND "createdAt" > (?)
         GROUP by path
         ORDER BY viewcount DESC`,
    {
      replacements: [
        id,
        date
      ],
      type: QueryTypes.SELECT
    }
  )

  let byDays = await sequelize.query(
    `SELECT "path", count("path") as viewcount, DATE_TRUNC('day', "createdAt") as "day"
         FROM records
         WHERE "trackerId"=(?) AND "createdAt" > (?)
         GROUP by path, DATE_TRUNC('day', "createdAt")
         ORDER BY DATE_TRUNC('day', "createdAt")`
    ,
    {
      replacements: [
        id,
        date
      ],
      type: QueryTypes.SELECT
    }
  )


  return {
    ...tracker.dataValues,
    statistics,
    byDays
  }
}

async function getTrackersByUserId(userId) {
  let user = await User.findOne({where: {id: userId}})
  if (user === null || user === undefined) {
    throw {message: "User not found"}
  }
  let trackers = await user.getTrackers()
  trackers = trackers.map(tracker => tracker.dataValues)
  return trackers
}

async function createTracker(userId, params) {
  let allowedFields = ['name', 'url']
  Object.keys(params).forEach(key => {
    if (allowedFields.indexOf(key) === -1) {
      throw {message: `Illegal field "${key}"`}
    }
  })
  if (!validator.isLength(params['name'], 3, 50))
    throw {message: `Incorrect name`}

  if (Object.keys(params).indexOf('url') !== -1)
    if (!validator.isURL(params['url']))
      throw {message: `Incorrect url`}
  let tracker = await Tracker.create({...params, userId})
  return tracker.dataValues
}

async function deleteTrackerById(id) {
  let tracker = await Tracker.findOne({where: {id}})
  if (tracker === null || tracker === undefined) {
    throw {message: "Tracker not found"}
  }
  tracker.destroy()
  return true
}

async function updateTracker(id, params) {
  let allowedFields = ['name', 'url']
  Object.keys(params).forEach(key => {
    if (allowedFields.indexOf(key) === -1) {
      throw {message: `Illegal field "${key}"`}
    }
  })
  if (Object.keys(params).indexOf('name') !== -1)
    if (!validator.isLength(params['name'], 3, 50))
      throw {message: `Incorrect name`}

  if (Object.keys(params).indexOf('url') !== -1)
    if (!validator.isURL(params['url']))
      throw {message: `Incorrect url`}
  let tracker = await Tracker.findOne({where: {id}})
  if (tracker === null || tracker === undefined) {
    throw {message: "Tracker not found"}
  }
  await tracker.update(params)
  return tracker.dataValues
}

module.exports = {
  getTrackersByUserId,
  getTrackerById,
  createTracker,
  deleteTrackerById,
  updateTracker
}
