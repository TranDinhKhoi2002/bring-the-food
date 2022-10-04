import mongoose from "mongoose";
import AltAccount from "../../src/models/altAccount";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return;

  const { email, foodId } = req.body;

  await mongoose.connect(
    "mongodb+srv://bringthefood:S6WDxhiRVxyfPC02@cluster0.9srxm.mongodb.net/bringthefood?retryWrites=true&w=majority"
  );

  const altAccount = await AltAccount.findOne({ email });
  const removedFoodIndex = altAccount.cart.items.findIndex(
    (item) => item.food.id === foodId
  );

  if (removedFoodIndex === -1) {
    return res.status(404).json({ message: "No food found" });
  }

  const updatedCartItems = altAccount.cart.items.filter(
    (item) => item.food.id !== foodId
  );
  altAccount.cart.items = updatedCartItems;
  await altAccount.save();

  res.status(200).json({ message: "Successfully removed food" });
}
