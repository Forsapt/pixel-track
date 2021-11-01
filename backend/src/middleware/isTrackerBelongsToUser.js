const sequelize = require("../models");
const Tracker = sequelize.models.tracker;

module.exports = async function isTrackerBelongsToUser(req, res, next) {
  let trackerId = req.params.trackerId;
  let usedId = req.user.id;
  let tracker = await Tracker.findOne({where: {id: trackerId}})
  if(tracker.dataValues.userId !== usedId){
    res.status(400).send("The tracker is not owned by the user")
  }else{
    next()
  }
}
