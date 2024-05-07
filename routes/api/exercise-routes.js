const router = require('express').Router();
const { MuscleGroup, Exercise } = require ('../../models');

//Getting exercises by muscle group ID
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