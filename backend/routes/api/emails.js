const express = require('express');
const mongoose = require("mongoose");
const Email = mongoose.model("Email");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const { requireUser } = require('../../config/passport');




//Create
router.post('/', requireUser,async (req, res) => {
    try {

        const { subject, message, to } = req.body;
        const email = new Email({
        subject,
        message,
        to,
        user: req.body.user
        });
        await email.save();
        res.status(201).send(email);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Read
router.get('/', requireUser, async (req, res) => {
  try {
    const emails = await Email.find({ user: req.user });
    res.status(200).send(emails);
  } catch (error) {
    res.status(500).send(error);
  }
});


//
router.get('/:id', async (req, res) => {
    try {
        console.log(req)
        const email = await Email.findById(req.params.id);
        if (!email) {
            return res.status(404).send();
        }
        res.status(200).send(email);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const email = await Email.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!email) {
            return res.status(404).send();
        }
        res.status(200).send(email);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.delete('/:id', async (req, res) => {
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


router.get('/search', requireUser, async (req, res) => {
    console.log(req.query.query)
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).send({ error: 'Search term is required' });
    }

    try {
        const emails = await Email.find({
            user: req.user,
            subject: new RegExp(searchTerm, 'i') // This will make the search case-insensitive
        });

        res.status(200).send(emails);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;
