const express = require("express");
const bodyParser = require("body-parser");
const applyRoutes = require("./controllers");
const passportSetup = require("./passport-setup");
const path = require("path");
const config = require("./config");

const app = express();
app.use(express.static('public'));
app.get('/loginRedirect', (req, res, next) => {
  let index_file = path.join(
    path.dirname(__dirname),
    "public",
    "index.html"
  );
  res.sendFile(index_file)
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passportSetup(app);
applyRoutes(app);
app.listen(config.post);
