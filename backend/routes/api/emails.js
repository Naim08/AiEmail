const express = require("express");
const mongoose = require("mongoose");
const Email = mongoose.model("Email");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { requireUser, getMostRecentEmails } = require("../../config/passport");

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

router.get("/search", requireUser, async (req, res) => {
    const searchTerm = req.query.query;
    if (!searchTerm) {
        return res.status(400).send({ error: "Search term is required" });
    }

    try {
        const emails = await Email.find({
            // user: req.user,
            subject: new RegExp(searchTerm, "i"), // This will make the search case-insensitive
        });

        res.status(200).send(emails);
    } catch (error) {
        res.status(500).send(error);
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

// Trash an email
router.patch("/trash/:id", async (req, res) => {
    try {
        const email = await Email.findByIdAndUpdate(
            req.params.id,
            { isTrashed: true },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!email) {
            return res.status(404).send();
        }
        res.status(200).send(email);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete all trashed emails
router.delete("/trash/emptytrash", requireUser, async (req, res) => {
    try {
        await Email.deleteMany({ user: req.user, isTrashed: true });
        res.status(200).send({
            message: "Trashed emails deleted successfully.",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Restore a trashed email
router.patch("/restore/:id", async (req, res) => {
    try {
        const email = await Email.findByIdAndUpdate(
            req.params.id,
            { isTrashed: false },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!email) {
            return res.status(404).send();
        }
        res.status(200).send(email);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
