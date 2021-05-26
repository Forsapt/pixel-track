const sequelize = require("../models");
const Tracker = sequelize.models.tracker;

module.exports =  function(req, res, next) {
  let trackerId = req.params.trackerId;
  let usedId = req.user.id;
  Tracker.findOne({where: {id: trackerId}})
    .then(
      tracker => {
        if(tracker.dataValues.userId !== usedId){
          res.status(400).send("The tracker is not owned by the user")
        }
        next()
      }
    )
    .catch(
      _ => next()
    )
}
