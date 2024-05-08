const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Exercise extends Model{}

Exercise.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    musclegroup_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'musclegroup',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gif: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    equipment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructions: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
    timestamps: false,
    modelname: "exercise",
    freezeTableName: true,
});

module.exports = Exercise;