const router = require('express').Router();
const { MuscleGroup, Exercise } = require ('../../models');

// Get all exercises
router.get('/', async (req, res) => {
    try {
        const exerciseData = await Exercise.findAll();
        res.status(200).json(exerciseData);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Getting exercises by muscle group ID
router.get('/:id', async (req, res) => {
    try {
        const muscleData = await MuscleGroup.findByPk(req.params.id,{
            include: [ Exercise ]
        });

        res.status(200).json(muscleData);
     } catch (err) {
        res.status(400).json(err);
     }
});

// Getting exercises by equipment
router.get('/:equipment', async (req, res) => {
    try {
        const equipmentData = await Exercise.findByPk(req.params.equipment,);
        res.status(200).json(equipmentData);
     } catch (err) {
        res.status(400).json(err);
     }
});