const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');
const userRoutes = require('./userRoutes')

router.use('/comments', commentRoutes);
router.use('/pizzas', pizzaRoutes);
router.use('/users', userRoutes)

module.exports = router;
