require('dotenv').config();
const axios = require('axios');

// Define an array of API keys through the env
const apiKeys = [
  process.env.API_KEY_1,
  process.env.API_KEY_2,
  process.env.API_KEY_3,
  process.env.API_KEY_4
];

const getRandomApiKey = () => {
  // Randomly select an API key from the array above
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
};

//API fetch call
const fetchData = async () => {
  const apiKey = getRandomApiKey();
    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/upper%20legs',
        params: {limit: '200'},
        headers: {
          'X-RapidAPI-Key': '65d425a615msh8b10438e995f535p1d297ajsn78f72a232e93',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    }

fetchData();