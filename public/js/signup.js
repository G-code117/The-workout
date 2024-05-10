const signupFormHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const gender = document.querySelector("#gender-signup").value;
    const age = parseInt(document.querySelector("#age-signup").value);
    const height = parseFloat(document.querySelector("#height-signup").value);
    const weight = parseFloat(document.querySelector("#weight-signup").value);
    if (name && email && password && !isNaN(age) && !isNaN(height) && !isNaN(weight)) {

      const response = await fetch('/api/user/signup', {
        method: 'POST',    
        body: JSON.stringify({ name, email, password, gender, age, height, weight }),
        headers: {
          'Content-Type': 'application/json'
        }
      });  
  
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