const { Schema, model } = require("mongoose");

const toppingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
);

const Topping = model('Topping', toppingSchema);

module.exports = Topping;