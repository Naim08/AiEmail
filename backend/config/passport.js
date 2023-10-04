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
const { google } = require("googleapis");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(gmailClientId, gmailSecret, gmailRedirectUri);

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
          else {
            user.authMethod = "local";
            done(null, user);
          }
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
      profile.authMethod = "google";
      return cb(null, profile);
    }
  )
);

// Serialize user to session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser(function (user, done) {
  done(null, user);
});
exports.restoreUser = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, function (err, user) {
    if (err) return next(err);
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

function isAuthenticated(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach the user data to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: "Invalid token." });
  }
}
exports.isAuthenticated = isAuthenticated;

async function refreshAccessToken(oAuth2Client) {
  try {
    const { tokens } = await oAuth2Client.refreshAccessToken();
    oAuth2Client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

async function getMostRecentEmails(authToken, refreshToken, maxResults = 10) {
  oAuth2Client.setCredentials({
    access_token: authToken,
    refresh_token: refreshToken,
  });
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults,
  });

  const messages = response.data.messages;
  console.log(messages);

  const promises = messages.map(async (message) => {
    const response = await gmail.users.messages.get({
      userId: "me",
      id: message.id,
    });

    return response.data;
  });

  const emails = await Promise.all(promises);

  return emails;
}

exports.getMostRecentEmails = getMostRecentEmails;
