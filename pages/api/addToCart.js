import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { productId, quantity } = req.body;
  await mongoose.connect(
    "mongodb+srv://bringthefood:S6WDxhiRVxyfPC02@cluster0.9srxm.mongodb.net/bringthefood?retryWrites=true&w=majority"
  );
}
