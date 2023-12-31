const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const {
    loginUser,
    restoreUser,
    getMostRecentEmails,
} = require("../../config/passport");
const Email = require("../../models/Email");

const { isProduction } = require("../../config/keys");

const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

const mongoose = require("mongoose");
const User = mongoose.model("User");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.json({
        message: "GET /api/users",
    });
});

router.post("/register", validateRegisterInput, async (req, res, next) => {
    const user = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (user) {
        const err = new Error("Validation Error");
        err.statusCode = 400;
        const errors = {};
        if (user.email === req.body.email) {
            errors.email = "A user has already registered with this email";
        }
        if (user.username === req.body.username) {
            errors.username =
                "A user has already registered with this username";
        }
        err.errors = errors;
        return next(err);
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
            if (err) throw err;
            try {
                newUser.hashedPassword = hashedPassword;
                const user = await newUser.save();
                return res.json(await loginUser(user));
            } catch (err) {
                next(err);
            }
        });
    });
});

router.post("/login", validateLoginInput, async (req, res, next) => {
    passport.authenticate("local", async function (err, user) {
        if (err) return next(err);
        if (!user) {
            const err = new Error("Invalid credentials");
            err.statusCode = 400;
            err.errors = { email: "Invalid credentials" };
            return next(err);
        }
        return res.json(await loginUser(user));
    })(req, res, next);
});

router.get("/current", restoreUser, async (req, res) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }
    if (!req.user) return res.json(null);

    if (!req.session.updatedGoogle) {
        if (
            req.user.googleAccessToken &&
            req.user.googleRefreshToken &&
            !req.session.updatedGoogle
        ) {
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

            req.session.updatedGoogle = true;
            res.cookie("updatedGoogle", true);
        }
    }
    res.json({
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
    });
});

router.delete("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.session = null;
        req.session = null;
        res.clearCookie();
        res.json({ message: "Logout successful" });
    });
});
// router.post("/logout", (req, res) => {
//   req.logout();
//   res.json({ message: "Logout successful" });
// });
router.get("/login-demo", async (req, res, next) => {
    try {
        // Fetch the demo user from the database
        // Replace "demo@email.com" with the email of your demo user
        const user = await User.findOne({ email: "demo-user@appacademy.io" });

        if (!user) {
            return res.status(404).json({ message: "Demo user not found." });
        }

        // Log in the demo user
        const tokenData = await loginUser(user);
        return res.json(tokenData); // Sending the JWT to the client
    } catch (err) {
        next(err);
    }
});

router.patch("/update", restoreUser, async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }
        if (req.body.username) user.username = req.body.username;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(
                    req.body.password,
                    salt,
                    async (err, hashedPassword) => {
                        if (err) throw err;
                        user.hashedPassword = hashedPassword;
                        await user.save();
                        return res.json(await loginUser(user));
                    }
                );
            });
        } else {
            await user.save();
            return res.json(await loginUser(user));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
