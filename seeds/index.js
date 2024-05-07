const sequelize = require('../config/connections');
const seedUsers = require('./user.json');
const seedExercise = require('./exerciseData.json');
const seedMuscleGroup = require('./muscleGroupData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
  
    await seedUsers();
  
    await seedExercise();

    await seedMuscleGroup();
  
    process.exit(0);
  };
  
  seedAll();