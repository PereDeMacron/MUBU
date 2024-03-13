require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Newsletter = require("./newsletterModel");

const app = express();
const PORT = process.env.PORT || 5002;
const MONGODB_URI =
  "mongodb+srv://peredemacron:PM8RC23JeWHpFDKY@mubu.gzdxgnv.mongodb.net/?retryWrites=true&w=majority&appName=MUBU";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/subscribe", async (req, res) => {
  const email = req.body.email;

  try {
    if (!email) {
      return res.status(400).json({
        status: "No_Email",
        message: "Email is missing or empty",
      });
    }

    const existingSubscriber = await Newsletter.findOne({ email: email });
    if (existingSubscriber) {
      return res.status(400).json({
        status: "Existing_Subscriber",
        message: "Email is already subscribed",
      });
    }

    const newSubscriber = new Newsletter({ email: email });
    await newSubscriber.save();
    res
      .status(201)
      .json({ status: "Success", message: "Subscription successful!" });
  } catch (err) {
    console.error("Error subscribing:", err);
    res
      .status(500)
      .json({
        status: "Error",
        message: "Error subscribing. Please try again later.",
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
