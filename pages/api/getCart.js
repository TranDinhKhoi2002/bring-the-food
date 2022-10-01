import AltUser from "../../src/models/altUser";

export default async function handler(req, res) {
  const { email } = req.body;

  const altUser = await AltUser.findOne({ email });
  if (altUser) {
    res.status(200).json({ cartItems: altUser.cart.items });
  } else {
    res.status(404).json({ message: "No user found" });
  }
}
