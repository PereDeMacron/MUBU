require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Newsletter = require("./newsletterModel");
const app = express();
const PORT = process.env.PORT || 5002;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://peredemacron:PM8RC23JeWHpFDKY@mubu.gzdxgnv.mongodb.net/?retryWrites=true&w=majority&appName=MUBU";

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Existing newsletter subscription route
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
    res.status(500).json({
      status: "Error",
      message: "Error subscribing. Please try again later.",
    });
  }
});

// User Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// User Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
