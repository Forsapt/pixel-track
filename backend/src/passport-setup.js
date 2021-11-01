const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const sequelize = require("./models");
const RefreshToken = sequelize.models.refreshToken;
const config = require("./config");
const {userService} = require('./services')

async function generateToken() {
  let result = [];
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < 32; i++) {
    result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
  }
  return result.join('');

}

passport.serializeUser(function (user, done) {
  done(null, {id: user.id});
});

passport.deserializeUser(function (id, done) {
  done(id)
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      let username = profile._json.name;
      let email = profile._json.email;
      let googleId = profile.id;
      try {
        let user = await userService.getUserByGoogleId(googleId)
        if (user == null) {
          user = await userService.createUser(
            {
              username,
              email,
              googleId
            }
          )
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt_secret;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    let timespan = new Date() / 1000 - jwt_payload.iat;
    if (timespan > config.jwt_ttl) {
      return done(null, false, {message: 'Token expired'})
    }
    return done(null, {id: jwt_payload.id})
  })
);

module.exports = function (app) {
  app.use(passport.initialize());

  app.get(
    "/auth/google",
    passport.authenticate("google", {scope: ["profile", "email"], prompt: 'select_account'})
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {failureRedirect: "/auth/google"}),
    async function (req, res) {
      let accessToken = jwt.sign({id: req.user.id}, config.jwt_secret)
      let refreshToken = await generateToken()
      await RefreshToken.create({userId: req.user.id, token: refreshToken})
      refreshToken = refreshToken.toString('hex')
      res.redirect(`/loginRedirect#${accessToken}&${refreshToken}`)
    }
  );

  app.get(
    "/api/auth/renew/:refreshToken",
    async function (req, res) {
      try {
        let oldToken = await RefreshToken.findOne({where: {token: req.params.refreshToken}})
        if (oldToken === null || oldToken === undefined) {
          return res.status(400).send("Invalid token")

        }
        if (oldToken.dataValues === null || oldToken.dataValues === undefined) {
          return res.status(400).send("Invalid token")
        }
        let id = oldToken.dataValues.userId
        await oldToken.destroy()
        let accessToken = jwt.sign({id: id}, config.jwt_secret)
        let refreshToken = await generateToken()
        await RefreshToken.create({userId: id, token: refreshToken})
        refreshToken = refreshToken.toString('hex')
        return res.json({
          accessToken,
          refreshToken
        });
      } catch (e) {
        res.status(500).send("Internal error")
      }
    }
  );
};
