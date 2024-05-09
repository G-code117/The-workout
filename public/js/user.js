function getWorkoutsByMuscleGroup (groupName) {
 
}

function displayWorkouts(workouts) {

    const workoutContainer = ('#workout-container');
    workoutContainer.empty();

    workouts.forEach(function(workout){
        let $workoutElement = $('<div>', { class: 'workout-item' });
        $workoutElement.append($('<h4>', { text: workout.name }));
        $workoutElement.append($('<img>', { src: workout.gif, alt: workout.name }));
        $workoutElement.append($('<p>', { text: workout.equipment }));
        $workoutElement.append($('<p>', { text: workout.instructions }));

        // Append workout element to container
        $workoutContainer.append($workoutElement);
    });
}