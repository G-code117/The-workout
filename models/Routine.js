const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Routine extends Model{}

Routine.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    workout_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'workout',
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
    
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "routine",
});

module.exports = Routine;