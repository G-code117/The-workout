const calculate = require('fitness-health-calculations');

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/users');
      } else {
        alert(response.statusText);
      }
    }
  };
  
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
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, gender, age, height, weight }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/users');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);