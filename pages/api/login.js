import { compareSync } from "bcryptjs";
import User from "../../src/models/user";
import mongoose from "mongoose";
import AltAccount from "../../src/models/altAccount";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password, type } = req.body;
  await mongoose.connect(
    "mongodb+srv://bringthefood:S6WDxhiRVxyfPC02@cluster0.9srxm.mongodb.net/bringthefood?retryWrites=true&w=majority"
  );

  if (type === "email") {
    const existingUser = await User.findOne({ username: email });
    if (!existingUser) {
      return res.status(404).json({ message: "No user found" });
    }

    const isValidPassword = compareSync(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(422).json({ message: "Password is incorrect" });
    }
  } else {
    const existingAccount = await AltAccount.findOne({ email });
    if (!existingAccount) {
      const altAccount = new AltAccount({
        email,
        cart: {
          items: [],
        },
      });
      await altAccount.save();
    }
  }

  res.status(200).json({ message: "Login successfully" });
}
