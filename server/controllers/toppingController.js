const { Topping, Pizza } = require("../models");

module.exports = {
  // Get all Toppings with pizzas they appear on
  async getToppings(req, res) {
    try {
      const toppings = await Topping.find();
      const toppingsWithPizzas = await Promise.all(
        toppings.map(async (topping) => {
          const pizzas = await Pizza.find({ toppings: topping._id });
          return { ...topping.toJSON(), pizzas: pizzas.map(pizza => pizza.name) };
        })
      );

      res.status(200).json(toppingsWithPizzas);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single Topping
  async getSingleTopping(req, res) {
    try {
      const topping = await Topping.findOne({
        _id: req.params.toppingId,
      });

      if (!topping) {
        return res.status(404).json({ message: "This topping does not exist" });
      }

      res.status(200).json(topping);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new Topping
  async createTopping(req, res) {
    try {
      const topping = await Topping.create(req.body);
      res.status(200).json(topping);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a Topping
  async deleteTopping(req, res) {
    try {
      const topping = await Topping.findOneAndRemove({
        _id: req.params.toppingId,
      });

      if (!topping) {
        return res.status(404).json({ message: "This topping does not exist" });
      }

      // Conditonal logic to check if any pizzas had the deleted topping
      let pizzaUpdated = false;

      const pizza = await Pizza.findOneAndUpdate(
        { toppings: req.params.toppingId },
        { $pull: { toppings: req.params.toppingId } },
        { new: true }
      );

      if (pizza) {
        pizzaUpdated = true;
      }

      if (pizzaUpdated) {
        return res.status(200).json({
          message: "Topping successfully deleted and pizzas updated",
        });
      } else {
        return res.status(200).json({
          message: "Topping successfully deleted. No pizzas were updated",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a Topping
  async updateTopping(req, res) {
    try {
      const topping = await Topping.findOneAndUpdate(
        { _id: req.params.toppingId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!topping) {
        res.status(404).json({ message: "No topping with this id!" });
      }
      res.status(200).json(topping);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
