const sequelize = require('../config/connection');
const { User, MuscleGroup, Exercise, Workout, Routine } = require('../models');

const seedUsers = require('./user.json');
const seedExercise = require('./exerciseData.json');
const seedMuscleGroup = require('./muscleGroupData.json');
const seedWorkout = require('./workoutData.json');
const seedRoutine = require('./routineData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(seedUsers, {
      individualHooks: true,
      returning: true,
    });
  
    await MuscleGroup.bulkCreate(seedMuscleGroup);

    await Exercise.bulkCreate(seedExercise);
  
    await Workout.bulkCreate(seedWorkout);

    await Routine.bulkCreate(seedRoutine);

    console.log('seed complete')
    process.exit(0);
  };
  
  seedAll();