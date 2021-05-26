function applyRoutes(app) {
  app.use("/api/user", require("./userController"));
  app.use("/api/tracker", require("./trackerController"));
  app.use("/api/record", require("./recordController"));
}

module.exports = applyRoutes;
