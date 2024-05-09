const User = require('./Users');
const Exercise = require('./Exercises');
const MuscleGroup = require('./MuscleGroup');
const Workout = require('./Workout');
const Routine = require('./Routine');

User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

Workout.belongsTo(User, {
foreignKey: 'user_id'
})
  
Workout.belongsToMany(Exercise, {
  through: {model: Routine, foreignKey: 'workout_id' }
  });

Exercise.belongsToMany(Workout, {
  through: {model: Routine, foreignKey: 'exercise_id' }
  });

MuscleGroup.hasMany(Exercise, {
    foreignKey: 'musclegroup_id',
  });

Exercise.belongsTo(MuscleGroup, {
  foreignKey: 'musclegroup_id',
});

module.exports = { User, Exercise, MuscleGroup, Workout, Routine };
