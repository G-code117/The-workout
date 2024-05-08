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
        references: {
            model: 'musclegroup',
            key: 'id',
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
        type: DataTypes.TEXT,
        allowNull: false,
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "exercise",
});

module.exports = Exercise;