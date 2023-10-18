require("dotenv").config();
const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Email = require("../models/Email");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const NUM_SEED_USERS = 10;

const NUM_SEED_EMAILS = 20;

// Create users
const users = [];

users.push(
    new User({
        username: "demo-user",
        email: "demo-user@appacademy.io",
        hashedPassword: bcrypt.hashSync("starwars", 10),
    })
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    users.push(
        new User({
            username: faker.internet.userName(firstName, lastName),
            email: faker.internet.email(firstName, lastName),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
        })
    );
}

// Create emails
const emails = [];
for (let i = 0; i < NUM_SEED_EMAILS; i++) {
    const sender = users[Math.floor(Math.random() * users.length)];
    const recipient = users[Math.floor(Math.random() * users.length)];
    emails.push({
        subject: faker.lorem.sentence(),
        message: faker.lorem.paragraphs(),
        sender: sender._id,
        recipient: recipient._id,
        dateSent: faker.date.past(),
    });
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        insertSeeds();
    })
    .catch((err) => {
        console.error(err.stack);
        process.exit(1);
    });

const insertSeeds = () => {
    User.collection
        .drop()
        .then(() => User.insertMany(users))
        .then(() => {})
        .then(() => Email.insertMany(emails))
        .then(() => {
            mongoose.disconnect();
        })
        .catch((err) => {
            console.error(err.stack);
            process.exit(1);
        });
};
