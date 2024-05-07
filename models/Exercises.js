const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Exercise extends Model{}

Exercise.init({
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    musclegroup_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'musclegroup',
            key: id
        }
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    gif: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    equipment: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    instructions: {
        type: Datatypes.STRING,
        allowNull: false,
    }
},{
    sequelize,
    timestamps: false,
    modelname: "exercise",
    freezeTableName: true,
});

module.exports = Exercise;