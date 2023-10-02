const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");

const debug = require("debug");
const csurf = require("csurf");
const cors = require("cors");
const { isProduction } = require("./config/keys");

const { expressSessionSecret } = require("./config/keys");

require("./models/User");
require("./config/passport");

const passport = require("passport");

const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const chatGPTRouter = require("./routes/api/chatgpt");

const User = require("./models/User");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  require("express-session")({
    secret: expressSessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

if (!isProduction) {
  app.use(cors());
}

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use("/api/users", usersRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/chatgpt", chatGPTRouter);

if (isProduction) {
  const path = require("path");
  app.get("/", (req, res) => {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });

  app.use(express.static(path.resolve("../frontend/build")));

  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
    accessType: "offline",
    prompt: "consent",
  })
);

app.get(
  "/oauth2/redirect/google",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log(req.user);

    //save req.accessToken and req.refreshToken to your database, user model
    User.findOneAndUpdate(
      { email: req.user.email },
      {
        googleAccessToken: req.user.accessToken,
        googleRefreshToken: req.user.refreshToken,
      }
    ).then((user) => {
      // save the user data to your database here
      user.googleAccessToken = req.user.accessToken;
      user.refreshToken = req.user.refreshToken;
      user.save();
    });

    res.cookie("accessToken", req.user.accessToken);
    res.cookie("refreshToken", req.user.refreshToken);
    res.redirect("http://localhost:3000");
  }
);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});
// This route starts the Google OAuth flow.

module.exports = app;
