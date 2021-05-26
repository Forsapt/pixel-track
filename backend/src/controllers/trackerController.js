const express = require("express");
const router = express.Router();
const {privateRoute, isTrackerBelongsToUser} = require("../middleware");
const {trackerService} = require('../services')

router.get("/", privateRoute, (req, res, next) => {
  trackerService.getTrackersByUserId(req.user.id)
    .then(
      trackers => res.json(trackers)
    ).catch(
    err => res.status(400).send(err.message)
  )
});

router.get(
  "/:trackerId",
  privateRoute,
  isTrackerBelongsToUser,
  (req, res, next) => {
  trackerService.getTrackerById(req.params.trackerId)
    .then(
      trackers => res.json(trackers)
    ).catch(
    err => res.status(400).send(err.message)
  )
});

router.post("/", privateRoute, (req, res, next) => {
  trackerService.createTracker(req.user.id, req.body)
    .then(
      trackers => res.json(trackers)
    ).catch(
    err => res.status(400).send(err.message)
  )
});


router.delete(
  "/:trackerId",
  privateRoute,
  isTrackerBelongsToUser,
  (req, res, next) => {
  trackerService.deleteTrackerById(req.params.trackerId)
    .then(
      _ => res.send('OK')
    ).catch(
    err => res.status(400).send(err.message)
  )
});

router.put(
  "/:trackerId",
  privateRoute,
  isTrackerBelongsToUser,
  (req, res, next) => {
  trackerService.updateTracker(req.params.trackerId, req.body)
    .then(
      trackers => res.json(trackers)
    ).catch(
    err => res.status(400).send(err.message)
  )
});

module.exports = router;
