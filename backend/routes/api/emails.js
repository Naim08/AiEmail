const express = require('express');
const mongoose = require("mongoose");
const Email = mongoose.model("Email");
const router = express.Router();

//Create
router.post('/', async (req, res) => {
    try {
        const { subject, message } = req.body;
        const email = new Email({ subject, message });
        await email.save();
        res.status(201).send(email);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Read
router.get('/', async (req, res) => {
    try {
        const emails = await Email.find();
        res.status(200).send(emails);
    } catch (error) {
        res.status(500).send(error);
    }
});

//
router.get('/:id', async (req, res) => {
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

module.exports = router;
