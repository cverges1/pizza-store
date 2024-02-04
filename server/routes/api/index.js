const router = require('express').Router();
const pizzaRoutes = require('./pizzaRoutes');
const toppingRoutes = require('./toppingRoutes');

router.use('/pizzas', pizzaRoutes);
router.use('/toppings', toppingRoutes);

module.exports = router;