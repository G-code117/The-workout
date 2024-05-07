const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Workout extends Model{}

Workout.init({
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: id
        }
    },
    exercise_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
            model: 'exercise',
            key: id
        }
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    date: {
        type: Datatypes.TIMESTAMP,
        allowNull: false,
    }
},{
    sequelize,
    timestamps: false,
    modelname: 'workout',
    freezeTableName: true,
});

module.exports = Workout;