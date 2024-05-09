const calculate = require('fitness-health-calculations');
function BMR(gender, age, height, weight) {
    let myBmr = calculate.bmr(gender, age, height, weight);
    return myBmr;
}
const signupFormHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const gender = document.querySelector("#gender").value;
    const age = parseInt(document.querySelector("#age").value);
    const height = parseFloat(document.querySelector("#height").value);
    const weight = parseFloat(document.querySelector("#weight").value);
    if (name && email && password && !isNaN(age) && !isNaN(height) && !isNaN(weight)) {
        const myBmr = BMR(gender, age, height, weight);
    body: JSON.stringify({ name, email, password, gender, age, height, weight })
  
      if (response.ok) {
        document.location.replace('/user');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);