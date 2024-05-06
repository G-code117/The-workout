const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class MuscleGroup extends Model{}

MuscleGroup.init({
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
    modelname: "muscleGroup",
    freezeTableName: true,
});

module.exports = MuscleGroup;