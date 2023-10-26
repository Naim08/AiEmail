const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");

const debug = require("debug");
const csurf = require("csurf");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

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
const mongoose = require("mongoose");
const {
  restoreUser,
  getUserEmail,
  getMostRecentEmails,
  requireUser,
  sendGmail,
} = require("./config/passport");
const Email = require("./models/Email");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    prompt: "select_account",
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
    console.log("session", req.session);
    console.log("sessionID", req.sessionID);
    User.findOneAndUpdate(
      { email: req.user.email },
      {
        googleAccessToken: req.user.accessToken,
        googleRefreshToken: req.user.refreshToken,
      }
    ).exec();

    res.redirect(
      req.hostname === "localhost"
        ? "http://localhost:3000/dashpage"
        : "/dashpage"
    );
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
      if (newEmail.message) {
        newEmail.save();
      }
    });
    res.json({ emails: Object.values(emails) });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Error fetching emails" });
  }
});
app.post("/send-email", requireUser, async (req, res) => {
  try {
    const emailId = req.body.id;
    const currEmail = Email.findById(emailId);
    if (!mongoose.Types.ObjectId.isValid(emailId)) {
      return res.status(400).send({ error: "Invalid email ID format." });
    }

    const email = {
      subject: req.body.subject,
      message: req.body.message,
      dateSent: new Date(),
      fromEmail: req.user.email,
      threadId: currEmail.threadId,
      responseUrl: "https://api.example.com/v1/respond-to-email",
      emailId: emailId,
      to: req.body.to,
    };

    // Check if user has Gmail connected
    if (req.user.googleAccessToken && req.user.googleRefreshToken) {
      await sendGmail(
        req.user.googleAccessToken,
        req.user.googleRefreshToken,
        email
      );
    } else {
      // Use SendGrid to send the email
      const msg = {
        to: email.to,
        from: "mailto@naimmiah.com", // Ensure this email is verified with SendGrid
        subject: email.subject,
        text: email.message,
      };
      await sgMail.send(msg);
    }

    res.status(201).send(email);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(400).send(error);
  }
});

// app.post("/send-email", requireUser, async (req, res) => {
//   try {
//     const emailId = req.body.emailId;
//     const currEmail = Email.findById(emailId);
//     const email = {
//       subject: req.body.subject,
//       message: req.body.message,
//       dateSent: new Date(),
//       fromEmail: req.user.email,
//       threadId: currEmail.threadId,
//       responseUrl: "https://api.example.com/v1/respond-to-email",
//       emailId: emailId,
//       to: req.body.to,
//     };
//     // const testEmail = new Email({
//     //   subject: "Meeting Reminder",
//     //   message:
//     //     "Hi Team, Just a reminder for our meeting tomorrow at 10 AM. Best, John",
//     //   dateSent: new Date("2023-09-30T04:00:00Z"),
//     //   fromEmail: "mmiah@fordham.edu",
//     //   snippet: "Hi Team, Just a reminder for our meeting tomorrow...",
//     //   threadId: "threadf1234567890",
//     //   responseUrl: "https://api.example.com/v1/respond-to-email",
//     //   emailId: "emailf1234567890",
//     //   to: "mmiah0890@gmail.com",
//     // });

//     await sendGmail(
//       req.user.googleAccessToken,
//       req.user.googleRefreshToken,
//       email
//     );

//     res.status(201).send(email);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
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
