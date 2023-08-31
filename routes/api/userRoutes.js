const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    loginToUser,
} = require('../../controllers/userController');

// /api/pizzas
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/login')
    .get(loginToUser);
// /api/pizzas/:id
// router
//   .route('/:id')
//   .get(getPizzaById)
//   .put(updatePizza)
//   .delete(deletePizza);

module.exports = router;
