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
    name:{
        type: Datatypes.STRING,
    }
},{
    sequelize,
    timestamps: false,
    modelname: 'workout',
    freezeTableName: true,
});

module.exports = Workout;