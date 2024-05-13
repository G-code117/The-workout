const getSwole = document.querySelector("#muscleGroup");


const bulkingUP =  async (event) => {
  event.preventDefault();
  const selectedMuscles = [];
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]');
  checkedBoxes.forEach((box) => {
    if (box.checked) {
      selectedMuscles.push(box.value);
    }
  });
  const response = await fetch('/getExercises', {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({selectedMuscles})
  })
  .then(response => response.json())
  .then(data => {
      renderExercises(data);
  })
  .catch(error => console.error('Error:', error));
};

const renderExercises = (data) => {
  const exerciseTemplate = document.getElementById('/makeworkout').innerHTML;
  const compiledTemplate = Handlebars.compile(exerciseTemplate);
  const renderedHTML = compiledTemplate(data);
  document.getElementById('exerciseList').innerHTML = renderedHTML;
};

getSwole.addEventListener("click", bulkingUP);

const makeWorkout = document.querySelector("#muscleGroup");
const newWorkout = async (event) => {
  event.preventDefault();
  document.location.replace('/makeworkout');
}
muscleGroup.addEventListener("click", newWorkout);

