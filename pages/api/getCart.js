import AltAccount from "../../src/models/altAccount";

export default async function handler(req, res) {
  const { email } = req.body;

  const altAccount = await AltAccount.findOne({ email });
  if (altAccount) {
    res.status(200).json({ cartItems: altAccount.cart.items });
  } else {
    res.status(404).json({ message: "No user found" });
  }
}
