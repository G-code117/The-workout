// function displayWorkouts(workouts) {

//     const workoutContainer = ('#workout-container');
//     workoutContainer.empty();

//     workouts.forEach(function(workout){
//         let $workoutElement = $('<div>', { class: 'workout-item' });
//         $workoutElement.append($('<h4>', { text: workout.name }));
//         $workoutElement.append($('<img>', { src: workout.gif, alt: workout.name }));
//         $workoutElement.append($('<p>', { text: workout.equipment }));
//         $workoutElement.append($('<p>', { text: workout.instructions }));

//         // Append workout element to container
//         $workoutContainer.append($workoutElement);
//     });
// }
const workouts = document.querySelector("#workouts");
const currentWorkout = async (event) => {
  event.preventDefault();
  const id = event.target.id;
  console.log(id);
  document.location.replace(`/workout/${id}`);
};


const newWorkout = document.querySelector("#newWorkout");
const createWorkout = async (event) => {
  event.preventDefault();



  document.location.replace('/createworkout');
}

newWorkout.addEventListener("click", createWorkout);
workouts.addEventListener("click", currentWorkout);