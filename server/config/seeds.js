// Importing our database connection
const db = require("./connection");
const { Topping, Pizza } = require("../models");

db.once("open", async () => {
  await Topping.deleteMany();

  // define topping seed data
  const toppings = await Topping.insertMany([
    { name: "Pepperoni" },
    { name: "Mushrooms" },
  ]);

  // Console log that lets us know that the toppings have been seeded
  console.log("Toppings seeded");

  await Pizza.deleteMany();

  const pizzas = await Pizza.insertMany([
    {
      name: "Pepperoni Pizza",
      toppings: [toppings[0]._id],
    },
    {
      name: "Mushroom Pizza",
      toppings: [toppings[1]._id],
    },
  ]);

  // Console log that lets us know that the pizzas have been seeded
  console.log("Pizzas seeded");

  process.exit();
});
