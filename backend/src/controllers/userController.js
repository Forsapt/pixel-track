const express = require("express");
const router = express.Router();
const {privateRoute} = require("../middleware");
const {userService} = require('../services')

router.get("/", privateRoute, async (req, res, next) => {
  try {
    let user = await userService.getUserById(req.user.id)
    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/", privateRoute, async (req, res, next) => {
  try{
    let user = await userService.updateUser(req.user.id, req.body)
    res.json(user)
  }catch (err) {
    res.status(400).send(err.message)
  }
});

module.exports = router;
