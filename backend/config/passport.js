const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const {
  secretOrKey,
  gmailClientId,
  gmailSecret,
  gmailRedirectUri,
} = require("./keys");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      session: false,
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      const user = await User.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
          if (err || !isMatch) done(null, false);
          else done(null, user);
        });
      } else done(null, false);
    }
  )
);

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      done(err);
    }
  })
);

exports.loginUser = async function (user) {
  const userInfo = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  const token = await jwt.sign(userInfo, secretOrKey, { expiresIn: 3600 });
  return {
    user: userInfo,
    token,
  };
};

exports.requireUser = passport.authenticate("jwt", { session: false });

passport.use(
  new GoogleStrategy(
    {
      clientID: gmailClientId,
      clientSecret: gmailSecret,
      callbackURL: gmailRedirectUri,
    },
    function (accessToken, refreshToken, profile, cb) {
      // get access to email and name
      const { email, name } = profile._json;
      profile.email = email;
      profile.name = name;
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      // Here you can save the profile data to your database if needed.
      return cb(null, profile);
    }
  )
);

// Serialize user to session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
exports.restoreUser = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, function (err, user) {
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

exports.ensureAuthenticated = ensureAuthenticated;
