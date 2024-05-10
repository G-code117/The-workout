const router = require("express").Router();
const { Exercise, User, Workout, MuscleGroup, Routine } = require("../models");
const { findAll } = require("../models/Users");
const withAuth = require("../utils/loginauth");
const {Op}= require("sequelize")

// GET homepage
router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });
    res.render("homepage", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/workout/:id", withAuth, async (req, res) => {
  try { 
    console.log("in workout route")
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: Exercise, through: Routine
          
        },
      ],
    });

    const workout = workoutData.get({ plain: true });
    console.log(workout);
    res.render("workout", {
      workout,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/user");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/user");
    return;
  }

  res.render("signup");
});

router.get("/createWorkout", withAuth, async (req, res) =>{
  try {
    let muscleGroup = await MuscleGroup.findAll({});
    muscleGroup = muscleGroup.map((muscle) => muscle.get({plain: true}));
    res.render("createworkout",{muscleGroup, logged_in: req.session.logged_in});

}catch(err){
  res.status(500).json(err)
}})
router.post("/getExercises", withAuth, async (req,res) =>{
  try {
    let getExercises = await Exercise.findAll({
      where:{
        musclegroup_id:{
          [Op.in]:req.body.selectedMuscles
        }
      },
      include: {model: MuscleGroup}
    })
    getExercises = getExercises.map((exercise) => exercise.get({plain: true}))
    res.render('')
  }catch(err){
  res.status(500).json(err)}
})


module.exports = router;
