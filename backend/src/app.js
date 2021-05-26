const express = require("express");
const bodyParser = require("body-parser");
const applyRoutes = require("./controllers");
const passportSetup = require("./passport-setup");
const path = require("path");

const config = require("./config");


const app = express();
app.use(express.static(path.resolve('./public/')));
app.get('/loginRedirect', (req, res, next) => {
  res.sendFile(path.resolve('./public/index.html'))
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passportSetup(app);
applyRoutes(app);
app.listen(config.post);
