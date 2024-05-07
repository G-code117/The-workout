const User = require('./Users');
const Exercise = require('./Exercises');
const MuscleGroup = require('./MuscleGroup');
const Workout = require('./Workout');
const WorkoutPlan = require('./WorkoutPlan');

User.hasMany(WorkoutPlan, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  WorkoutPlan.hasMany(Workout, {
    foreignKey: 'user_id',
  });

Workout.belongsTo(MuscleGroup, {

});

  MuscleGroup.hasMany(Exercise, {
    
  });

module.exports = { User, Exercise, MuscleGroup, Workout, WorkoutPlan };
