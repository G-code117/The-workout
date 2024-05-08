const User = require('./Users');
const Exercise = require('./Exercises');
const MuscleGroup = require('./MuscleGroup');
const Workout = require('./Workout');

User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

Workout.belongsTo(User, {
foreignKey: 'user_id'
})
  
Workout.hasMany(Exercise, {
    foreignKey: 'exercise_id',
    onDelete: 'CASCADE'
  });

Exercise.belongsTo(Workout, {
    foreignKey: 'exercise_id',
  });

MuscleGroup.hasMany(Exercise, {
    foreignKey: 'musclegroup_id',
  });

Exercise.belongsTo(MuscleGroup, {
  foreignKey: 'musclegroup_id',
});

module.exports = { User, Exercise, MuscleGroup, Workout };
