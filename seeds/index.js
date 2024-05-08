const sequelize = require('../config/connection');
const { User, MuscleGroup, Exercise } = require('../models');

const seedUsers = require('./user.json');
const seedExercise = require('./exerciseData.json');
const seedMuscleGroup = require('./muscleGroupData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(seedUsers, {
      individualHooks: true,
      returning: true,
    });
  
    await MuscleGroup.bulkCreate(seedMuscleGroup, {
      individualHooks: true,
      returning: true,
    });

    await Exercise.bulkCreate(seedExercise, {
      individualHooks: true,
      returning: true,
    });
  
    process.exit(0);
  };
  
  seedAll();