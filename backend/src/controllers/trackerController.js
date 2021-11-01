const express = require("express");
const router = express.Router();
const {privateRoute, isTrackerBelongsToUser} = require("../middleware");
const {trackerService} = require('../services')

router.get("/", privateRoute, async (req, res, next) => {
  try {
    let trackers = await trackerService.getTrackersByUserId(req.user.id)
    res.json(trackers)
  } catch (err) {
    res.status(400).send(err.message)
  }
});

router.get(
  "/:trackerId",
  privateRoute,
  isTrackerBelongsToUser,
  async (req, res, next) => {
    try {
      let tracker = await trackerService.getTrackerById(req.params.trackerId)
      res.json(tracker)
    } catch (err) {
      res.status(400).send(err.message)
    }
  });

router.post("/", privateRoute, async (req, res, next) => {
  try {
    let tracker = await trackerService.createTracker(req.user.id, req.body)
    res.json(tracker)
  } catch (err) {
    res.status(400).send(err.message)
  }
});


router.delete(
  "/:trackerId",
  privateRoute,
  isTrackerBelongsToUser,
  async (req, res, next) => {
    try {
      await trackerService.deleteTrackerById(req.params.trackerId)
      res.send('OK')
    } catch (err) {
      res.status(400).send(err.message)
    }
  });

router.put(
  "/:trackerId",
  privateRoute,
  isTrackerBelongsToUser,
  async (req, res, next) => {
    try {
      let tracker = await trackerService.updateTracker(req.params.trackerId, req.body)
      res.json(tracker)
    } catch (err) {
      res.status(400).send(err.message)
    }
  });

module.exports = router;
