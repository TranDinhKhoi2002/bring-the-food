import mongoose from "mongoose";
import User from "../../src/models/user";
import { hashSync } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password } = req.body;

  await mongoose.connect(
    "mongodb+srv://bringthefood:S6WDxhiRVxyfPC02@cluster0.9srxm.mongodb.net/bringthefood?retryWrites=true&w=majority"
  );

  const existingUser = await User.findOne({ username: email });
  if (existingUser) {
    return res.status(422).json({ message: "User already exists" });
  }

  const user = new User({
    username: email,
    password: hashSync(password),
    cart: {
      items: [],
    },
  });
  await user.save();
  res.status(201).json({ message: "User created" });
}
