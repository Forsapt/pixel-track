const express = require("express");
const {recordService} = require('../services')
const path = require("path");
const router = express.Router();

router.get("/pixel.png", (req, res, next) => {
  let pixel_file = path.resolve('./public/pixel.png')
  recordService.createRecord(req.query)
    .then(
      _ => {
        res.sendFile(pixel_file)
      }
    )
    .catch(
      _ => {
        res.sendFile(pixel_file)
      }
    )
});

module.exports = router;
