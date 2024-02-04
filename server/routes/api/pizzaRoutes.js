const router = require('express').Router();
const {
getPizzas,
getSinglePizza,
createPizza,
deletePizza,
updatePizza
} = require('../../controllers/pizzaController');

// endpoint: /api/pizzas
router.route('/').get(getPizzas).post(createPizza);

// endpoint: /api/pizzas/:pizzaId
router
    .route('/:pizzaId')
    .get(getSinglePizza)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;