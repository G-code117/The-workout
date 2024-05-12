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

};

getSwole.addEventListener("click", bulkingUP);
