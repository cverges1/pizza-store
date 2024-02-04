const router = require('express').Router();
const {
getToppings,
getSingleTopping,
createTopping,
deleteTopping,
updateTopping
} = require('../../controllers/toppingController');

// endpoint: /api/toppings
router.route('/').get(getToppings).post(createTopping);

// endpoint: /api/toppings/:toppingId
router
    .route('/:toppingId')
    .get(getSingleTopping)
    .put(updateTopping)
    .delete(deleteTopping);

module.exports = router;
