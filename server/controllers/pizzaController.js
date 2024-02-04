const { Pizza } = require("../models");

module.exports = {
  // Get all Pizzas
  async getPizzas(req, res) {
    try {
      const pizzas = await Pizza.find();

      res.status(200).json(pizzas);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single Pizza
  async getSinglePizza(req, res) {
    try {
      const pizza = await Pizza.findOne({
        _id: req.params.pizzaId,
      }).select("-__v");

      if (!pizza) {
        return res.status(404).json({ message: "This pizza does not exist" });
      }

      res.status(200).json(pizza);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new Pizza
  async createPizza(req, res) {
    try {
      const pizza = await Pizza.create(req.body);
      res.status(200).json(pizza);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a Pizza
  async deletePizza(req, res) {
    try {
      const pizza = await Pizza.findOneAndRemove({
        _id: req.params.pizzaId,
      });

      if (!pizza) {
        return res.status(404).json({ message: "This pizza does not exist" });
      }

      res.status(200).json({ message: "Pizza successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a Pizza
  async updatePizza(req, res) {
    try {
      const pizza = await Pizza.findOneAndUpdate(
        { _id: req.params.pizzaId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!pizza) {
        res.status(404).json({ message: "No pizza with this id!" });
      }
      res.status(200).json(pizza);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
