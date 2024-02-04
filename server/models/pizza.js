const { Schema, model } = require("mongoose");
const toppingSchema = require("./topping");

const pizzaSchema = new Schema({
  pizzaName: {
    type: String,
    required: true,
    unique: true
  },
  toppings: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Topping" 
  }],
});

const Pizza = model("Pizza", pizzaSchema);

module.exports = Pizza;
