const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("this is user")
    console.log(user)
    console.log("this is user password")
    console.log(user.checkPassword(req.body.password))
    console.log("this is the requirement for pass")
    console.log(req.body.password)
        if (!user || !user.checkPassword(req.body.password)) {
            res.status(401).json({ message: 'Incorrect email or password' });
            return;
        }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      
      res.json({ user: user, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
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