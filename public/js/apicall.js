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
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
        params: {limit: '10'},
        headers: {
          'X-RapidAPI-Key': apiKey,
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