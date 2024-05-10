const router = require('express').Router();
const { Exercise, User, Workout } = require('../models');
const withAuth = require('../utils/loginauth');

// GET homepage
router.get('/', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Workout }],
      });
  
      const user = userData.get({ plain: true });
      console.log(user);

        res.render('homepage', { 
            user, 
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/workout/:id', async (req, res) => {
    try {
      const workoutData = await Workout.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Exercise,
            attributes: ['name','gif','equipment','instructions']
          }
        ],
      });
  
      const workout = workoutData.get({ plain: true });
  
      res.render('workout', {
        ...workout,
        logged_in: req.session.logged_in
      });

    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/user');
      return;
    }
  
    res.render('login');
  });

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/user');
      return;
    }
  
    res.render('signup');
  });

module.exports = router;