import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import user from "./user.model.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error.message);
  }
};

connectDB();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/signup", async (req, res) => {
  try {
    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    await newUser.save();

    res.status(200).json({
      message: "User created successfully",
      data: req.body,
    });
    
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const userData = await user.findOne({ email: req.body.email });
    if (userData) {
      const valid = bcrypt.compare(req.body.password, userData.password);
      if (valid) {
        res.status(200).json({
          message: "User logged in successfully",
        });
      } else {
        res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(3000, () => {
  console.log("server started");
});
