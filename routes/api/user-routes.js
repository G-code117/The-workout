const router = require('express').Router();
const { User } = require('../../models');
const BMR = require('../../utils/calculateBMR')

router.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', BMR, async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
        if (!user || !user.checkPassword(req.body.password)) {
            res.status(401).json({ message: 'Incorrect email or password' });
            return;
        }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      
      res.json({ user: user, message: 'You are now logged in!', BMR });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/signup', async (req, res) => {
  console.log(req.body);
  
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(201).json(newUser);
    });
  } catch (error){
    console.error('Error saving user to database:', error);
    res.status(500).json({ error: 'An error occurred while saving user to database' });
  }
  });

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;