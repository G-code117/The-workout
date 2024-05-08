const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Workout extends Model{}

Workout.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'exercise',
            key: 'id',
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // date: {
    //     type: DataTypes.timestamps,
    //     allowNull: false,
    // }
},{
    sequelize,
    timestamps: false,
    modelName: 'workout',
    freezeTableName: true,
});

module.exports = Workout;