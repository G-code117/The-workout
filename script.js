//global variables

let searchHistoryArray = [];
let departureCurrencyValue = "";
let destinationCurrencyValue = "";
let conversionRateValue = "";
let conversionResultValue = "";
let budgetValue = "";
let departureCodeValue = "";
let destinationCodeValue = "";
let destinationCountryValue = "";
let destinationCapital = "";
let destinationFlag = "";

const exchangeAPIkey = "ba1b49989171d9b0410110d6";
const travelFormModal = document.querySelector("#form-section-modal");
const submitModalButton = document.querySelector("#my_modal_3");
const departureInput = document.querySelector(".departure-input");
const destinationInput = document.querySelector(".destination-input");
const budgetInput = document.querySelector(".budget-input");
const searchHistory = document.querySelector("#search-history-list");
const resultsContainer = document.querySelector("#results-section");
const apiKey = "gmOSLi0sE4brs48eLQFJxPwT0WY7uqOLMbpkbmKC";

bootSearchHistory();
travelFormModal.addEventListener("submit", submitSearch);
searchHistory.addEventListener("click", searchHistoryClick);

function submitSearch(event) {
  event.preventDefault();

  const departure = departureInput.value.trim();
  const destination = destinationInput.value.trim();
  const budget = parseInt(budgetInput.value.trim());
  budgetValue = budget;

  if (departure && destination && budget) {
    getCurrencyCodes(departure, destination, budget, true);
  }

  departureInput.value = "";
  destinationInput.value = "";
  budgetInput.value = "";


}

function getCurrencyCodes(departure, destination, budget, isSubmit) {
  const departureUrl = `https://corsproxy.io?http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=5&offsett&namePrefix=${departure}`;
  fetch(departureUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (departureData) {
      if (departureData) {
        const departureCode = departureData.data[0].currencyCodes[0];
        // const departureCountry = departureData.data[0].code;
        departureCodeValue = departureCode;

        const destinationUrl = `https://corsproxy.io?http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=5&offsett&namePrefix=${destination}`;
        fetch(destinationUrl)
          .then(function (response) {
            return response.json();
          })
          .then(async function (destinationData) {
            if (destinationData) {
              const destinationCode = destinationData.data[0].currencyCodes[0];
              const destinationCountry = destinationData.data[0].code;
              destinationCodeValue = destinationCode;
              destinationCountryValue = destinationCountry;

              if (isSubmit === true) {
                appendSearchHistory(departure, destination);
              }
              
             await getFlagging(destinationCountry);
             await getCurrency(departureCode, destinationCode);
              conversion(departureCode, destinationCode, budget);
            } else {
              console.log("No country data found");
            }
          });
      } else {
        console.log("No country data found");
      }
    });
}

async function getCurrency(departureCode, destinationCode) {
  const currencyNameUrl = `https://v6.exchangerate-api.com/v6/${exchangeAPIkey}/codes`;

  return await fetch(currencyNameUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const supportedCodes = data.supported_codes;

      for (let i = 0; i < supportedCodes.length; i++) {
        if (supportedCodes[i][0] === departureCode) {
          const departureCurrencyName = supportedCodes[i][1];
          departureCurrencyValue = departureCurrencyName;
        }
        if (supportedCodes[i][0] === destinationCode) {
          const destinationCurrencyName = supportedCodes[i][1];
          destinationCurrencyValue = destinationCurrencyName;
        }
        
      }
    });
}

async function getFlagging () {

    const countryUrl = `https://corsproxy.io?http://geodb-free-service.wirefreethought.com/v1/geo/countries/${destinationCountryValue}`;
    return await fetch(countryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (countryData) {
        if(countryData){
            const countryCaptial = countryData.data.capital;
            const flagImage = countryData.data.flagImageUri;
            destinationCapital = countryCaptial;
            destinationFlag = flagImage;
        }
        
    });
}

function appendSearchHistory(departure, destination) {
  if (searchHistoryArray === null) {
    return;
  } else {
    const search = {
        depart: departure,
        arrive: destination,
        budget: budgetValue
    }
    searchHistoryArray.push(search);
    localStorage.setItem("Search History", JSON.stringify(searchHistoryArray));
    renderSearchHistory();
  }
}

function renderSearchHistory() {
  searchHistory.innerHTML = "";
  for (let index = 0; index < searchHistoryArray.length; index++) {
    const newButton = document.createElement("button");
    newButton.setAttribute("type", "button");
    newButton.setAttribute("style", "text-align: center;");
    newButton.setAttribute("class", "btn past-search-button m-2");
    newButton.setAttribute("data-search", index);
    
    // Split the string into an array of words
    // const words = searchHistoryArray[index].split(' ');

    // Group words into pairs
    let lines = `Depart: ${searchHistoryArray[index].depart} <br> Arrive: ${searchHistoryArray[index].arrive} <br> Budget: ${searchHistoryArray[index].budget}`;
    
    // Set button text content with pairs joined by line breaks
    newButton.innerHTML = lines; // Using innerHTML to render HTML

    searchHistory.appendChild(newButton);
  }
}

function bootSearchHistory() {
  const storedHistory = JSON.parse(localStorage.getItem("Search History"));
  if (storedHistory === null) {
    return;
  } else if (storedHistory) {
    searchHistoryArray = storedHistory;
  }
  renderSearchHistory();
}

function searchHistoryClick(event) {
  if (!event.target.matches(".past-search-button")) {
    return;
  }
  const historyButton = event.target;
  const search = historyButton.getAttribute("data-search");

  const departure = searchHistoryArray[search].depart;
  const destination = searchHistoryArray[search].arrive;
  const budget = searchHistoryArray[search].budget;
  budgetValue = budget;

  getCurrencyCodes(departure, destination, budget, false)
}

const conversion = function (departureCode, destinationCode, budget) {
  const conversionURL = `https://v6.exchangerate-api.com/v6/${exchangeAPIkey}/pair/${departureCode}/${destinationCode}/${budget}`;

  fetch(conversionURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const conversionRate = data.conversion_rate;
      const conversionResult = data.conversion_result;
      
      conversionRateValue = conversionRate;
      conversionResultValue = conversionResult;
      displayResults();
    });
};

const displayResults = function () {
  const resultsCard = document.createElement("div");
  const title = document.createElement("h3");
  const currencyNameEl = document.createElement("p");
  const conversionRateEl = document.createElement("p");
  const currentConversionEl = document.createElement("p");
  const flag = document.createElement("img");

  resultsCard.setAttribute("class", "card-body");
  title.setAttribute("id", "title");
  title.setAttribute("class", "p-2 text-2xl");
  currencyNameEl.setAttribute("class", "ml-4");
  conversionRateEl.setAttribute("class", "ml-4");
  currentConversionEl.setAttribute("class", "ml-4");
  flag.setAttribute("id", "flag-image");
  flag.setAttribute("src", destinationFlag);

  title.textContent = "Results:";
  currencyNameEl.textContent = `Your destination's captial city is ${destinationCapital} and it uses the ${destinationCurrencyValue}.`;
  conversionRateEl.textContent = `The conversion rate is ${conversionRateValue} per ${departureCurrencyValue}.`;
  currentConversionEl.textContent = `Your budget of $${budgetValue} ${departureCodeValue} converts into $${conversionResultValue} ${destinationCodeValue}.`;

  resultsCard.append(
    title,
    currencyNameEl,
    conversionRateEl,
    currentConversionEl,
    flag
  );

  resultsContainer.innerHTML = "";
  resultsContainer.append(resultsCard);

  submitModalButton.close();
  location.replace("#results-section");
};
