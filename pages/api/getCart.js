import mongoose from "mongoose";
import AltAccount from "../../src/models/altAccount";

export default async function handler(req, res) {
  const { email } = req.body;

  await mongoose.connect(
    "mongodb+srv://bringthefood:S6WDxhiRVxyfPC02@cluster0.9srxm.mongodb.net/bringthefood?retryWrites=true&w=majority"
  );

  const altAccount = await AltAccount.findOne({ email });
  if (altAccount) {
    res.status(200).json({ cartItems: altAccount.cart.items });
  } else {
    res.status(404).json({ message: "No user found" });
  }
}
