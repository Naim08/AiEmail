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

require("./models/Email");
require("./models/ChatGPT");
require("./models/GPTModel");

require("./config/passport");

const passport = require("passport");

const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const chatGPTRouter = require("./routes/api/chatgpt");
const emailRouter = require("./routes/api/emails");
const User = require("./models/User");
const {
  restoreUser,
  getUserEmail,
  getMostRecentEmails,
  requireUser,
} = require("./config/passport");
const Email = require("./models/Email");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
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
app.use("/api/emails", emailRouter);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/plus.login",
      "https://mail.google.com/",
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
    //save req.accessToken and req.refreshToken to your database, user model
    User.findOneAndUpdate(
      { email: req.user.email },
      {
        googleAccessToken: req.user.accessToken,
        googleRefreshToken: req.user.refreshToken,
      }
    ).exec();
    res.redirect("http://localhost:3000/dashpage");
  }
);

app.get("/fetch-emails", requireUser, async (req, res) => {
  try {
    const emails = await getMostRecentEmails(
      req.user.googleAccessToken,
      req.user.googleRefreshToken
    );
    Object.values(emails).forEach((email) => {
      const newEmail = new Email({
        ...email,
        message: email.message,
        user: req.user._id,
      });
      console.log(newEmail);
      newEmail.save();
    });
    res.json({ emails: Object.values(emails) });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Error fetching emails" });
  }
});

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
