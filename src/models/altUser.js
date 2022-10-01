import { Schema, model, models } from "mongoose";

const altUserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],
  },
});

const AltUser = models.AltUser || model("AltUser", altUserSchema);

export default AltUser;
