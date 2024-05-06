const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class WorkoutPlan extends Model{}

WorkoutPlan.init({
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

module.exports = WorkoutPlan;