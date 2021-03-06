const express = require("express");
const {recordService} = require('../services')
const path = require("path");
const router = express.Router();

const pixelController = async (req, res, next) => {
  let pixel_file = path.resolve('./public/pixel.png')
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  await recordService.createRecord(req.query);
  res.sendFile(pixel_file);
}

router.get("/pixel.png", pixelController);
router.get("/*.png", pixelController);

module.exports = router;
