const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

<<<<<<< HEAD
// TODO: Add a comment describing the functionality of this expression
=======

>>>>>>> 06889bf16b8f4f6359742cd756e7406c28766108
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

<<<<<<< HEAD
// TODO: Add a comment describing the functionality of this object
=======

>>>>>>> 06889bf16b8f4f6359742cd756e7406c28766108
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

<<<<<<< HEAD
// TODO: Add a comment describing the functionality of this statement
=======

>>>>>>> 06889bf16b8f4f6359742cd756e7406c28766108
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
