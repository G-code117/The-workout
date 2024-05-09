const userPageEl = document.querySelector('#user-page');
const loginEl = document.querySelector('#login');
const nameInputEl = document.querySelector('#user');
const exerciseContainerEl = document.querySelector('#exercise-container');
const searchExercise = document.querySelector('#exercise-search');

const formSubmitHandler = function (event) {
  event.preventDefault();

  const username = nameInputEl.value.trim();

  if (username) {
    getUserExercise(username);

    exerciseContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter your username');
  }
};

const buttonClickHandler = function (event) {
  const language = event.target.getAttribute('data-language');

  if (loginEl) {
    getLoginPage(loginEl);

    exerciseContainerEl.textContent = '';
  }
};

const getUser = function (user) {
  const apiUrl = `https://localhost:3001/api/${user}`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayExercise(data, user);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
};

const getExercise = function (login) {
  const apiUrl = `https://localhost:3001/api/exercise?q=${exercise_db}`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayExercise(data.items, login);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });
};

const displayExercise = function (exercise, search) {
  if (exercise.length === 0) {
    exerciseContainerEl.textContent = 'No repositories found.';
    return;
  }

  searchExercise.textContent = search;

  for (let exerciseObj of exercise) {
    const exerciseName = `${exerciseObj.user.login}/${exerciseObj.name}`;

    const exerciseEl = document.createElement('a');
    exerciseEl.classList = 'list-item flex-row justify-space-between align-center';
    exerciseEl.setAttribute('href', `./single-exercise.html?exercise=${exerciseName}`);

    const titleEl = document.createElement('span');
    titleEl.textContent = exerciseName;

    exerciseEl.appendChild(titleEl);

    const statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (exerciseObj.open_issues_count > 0) {
      statusEl.innerHTML =
        `<i class='fas fa-times status-icon icon-danger'></i>${repoObj.open_issues_count} issue(s)`;
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    exerciseEl.appendChild(statusEl);

    exerciseContainerEl.appendChild(repoEl);
  }
};

nameInputEl.addEventListener('user', formSubmitHandler);
loginEl.addEventListener('click', buttonClickHandler);
