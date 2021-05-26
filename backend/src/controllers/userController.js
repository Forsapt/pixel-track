const express = require("express");
const router = express.Router();
const {privateRoute} = require("../middleware");
const {userService} = require('../services')

router.get("/", privateRoute, (req, res, next) => {
  userService.getUserById(req.user.id)
    .then(
      user => res.json(user)
    )
    .catch(
      err => res.status(400).send(err.message)
    )
});

router.put("/", privateRoute, (req, res, next) => {
  userService.updateUser(req.user.id, req.body)
    .then(
      user => {
        res.json(user)
      }
    )
    .catch(
      err => res.status(400).send(err.message)
    )
});

module.exports = router;
