const axios = require('axios');

const fetchData = async () => {
    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
        params: {limit: '10'},
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