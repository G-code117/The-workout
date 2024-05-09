const router = require('express').Router();
const userRoutes = require('./user-routes');
const exerciseRoutes = require('./exercise-routes');
const workoutRoutes = require('./workout-routes')

router.use('/user', userRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/workout', workoutRoutes);

module.exports = router;
