const sequelize = require('../config/connections');
const seedUsers = require('./userData');
const seedExercise = require('./exercise');

const seedAll = async () => {
    await sequelize.sync({ force: true });
  
    await seedUsers();
  
    await seedExercise();
  
    process.exit(0);
  };
  
  seedAll();