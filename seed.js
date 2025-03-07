// seed.js
const mongoose = require("mongoose");
const Event = require("./Event.js");
const User = require("./User.js");

async function seed_events() {
  await mongoose.connect("mongodb://localhost:27017/hivemind"); // NOTE: your conn string
  console.log("✅ MongoDB connected");

  const user = await User.findOne({ email: "your_email_id" }); // NOTE: our user_id

  const event = new Event({
    title: "tech event",
    date: new Date(),
    location: "new delhi",
    createdBy: user._id,
  });

  await event.save();
}

seed_events();