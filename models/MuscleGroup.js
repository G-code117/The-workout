const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class MuscleGroup extends Model{}

MuscleGroup.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
    }
},{
    sequelize,
    timestamps: false,
    modelname: 'musclegroup',
    freezeTableName: true,
});

module.exports = MuscleGroup;