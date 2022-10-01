import AltAccount from "../../src/models/altAccount";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { food, email } = req.body;
  console.log(food);
  // await mongoose.connect(
  //   "mongodb+srv://bringthefood:S6WDxhiRVxyfPC02@cluster0.9srxm.mongodb.net/bringthefood?retryWrites=true&w=majority"
  // );

  const altAccount = await AltAccount.findOne({ email });
  console.log(altAccount);

  const existingFoodIndex = altAccount.cart.items.findIndex(
    (items) => items.food.id === food.id
  );
  if (existingFoodIndex === -1) {
    altAccount.cart.items.push({ food, quantity: 1 });
  } else {
    altAccount.cart.items[existingFoodIndex].quantity++;
  }
  await altAccount.save();
  res.status(201).json({ message: "Successfully added to cart" });
}
