import { Schema, model, models } from "mongoose";

const altAccountSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        food: {
          type: Object,
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

const AltAccount = models.AltAccount || model("AltAccount", altAccountSchema);

export default AltAccount;
