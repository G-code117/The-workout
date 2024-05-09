const router = require('express').Router();
const { Workout } = require('../../models');
const withAuth = require('../../utils/loginauth');

// Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.findAll();
        res.json(workouts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findByPk(req.params.id);
        if (workout) {
            res.json(workout);
        } else {
            res.status(404).json({ message: "Workout not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Post new workout
router.post('/new', withAuth, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      name: req.body.name,
      exercise_id: req.body.exercise_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a Workout
router.put('/editSave/:id', async (req, res) => {
    try {
        const updatedWorkout = await Workout.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedWorkout[0]) {
            res.json({ message: 'Workout updated' });
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete existing workout
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: 'No workout found with this id!' });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;