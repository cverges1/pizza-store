const { Schema, model } = require("mongoose");

const toppingSchema = new Schema(
  {
    toppingName: {
      type: String,
      required: true,
    }
  },
);

const Topping = model('Topping', toppingSchema);

module.exports = Topping;