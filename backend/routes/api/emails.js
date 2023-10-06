const express = require("express");
const mongoose = require("mongoose");
const Email = mongoose.model("Email");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { requireUser, getMostRecentEmails } = require("../../config/passport");

//Create
router.post("/", requireUser, async (req, res) => {
  try {
    const { subject, message, to } = req.body;
    const email = new Email({
      subject,
      message,
      to,
      user: req.body.user,
    });
    await email.save();
    res.status(201).send(email);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Read
router.get("/", requireUser, async (req, res) => {
  try {
    const emails = await Email.find({ user: req.user });
    res.status(200).send(emails);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/:id", async (req, res) => {
  try {
    console.log(req);
    const email = await Email.findById(req.params.id);
    if (!email) {
      return res.status(404).send();
    }
    res.status(200).send(email);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const email = await Email.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!email) {
      return res.status(404).send();
    }
    res.status(200).send(email);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const email = await Email.findByIdAndDelete(req.params.id);
    if (!email) {
      return res.status(404).send();
    }
    res.status(200).send(email);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/fetch-emails", requireUser, async (req, res) => {
  console.log(req.user);
  try {
    const emails = await getMostRecentEmails(
      req.user.googleAccessToken,
      req.user.googleRefreshToken
    );
    Object.values(emails).forEach((email) => {
      new Email({
        emailId: email.id,
        fromEmail: email.from,
        subject: email.subject,
        date: email.date,
        body: email.body,
        snippet: email.snippet,
        userId: req.user._id,
      }).save();
    });
    res.json({ emails: Object.values(emails) });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Error fetching emails" });
  }
});

module.exports = router;
