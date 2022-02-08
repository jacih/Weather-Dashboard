let weatherAPIKey = `1eb674328cc11445a9756c568ef53d13`;

let searchedCityEl = $(`#search-input`);
let searchBtnEl = $(`#searchBtn`);
let currCityEl = $(`#city`);
let dateEl = $(`#date`);
let currWeatherEl = $(`#weather-details`);
let pastSearchesEl = $(`#results-list`);
let weatherIconEl = $(`#weather-icon`);
let forecastEl = $(`#5-day-cards`);
let tempEl = $(`#temp`);
let windEl = $(`#wind`);
let humidEl = $(`#humidity`);
let uviEl = $(`#uvi`);

let cities = [];
let lat;
let lon;

// function to get lat and lon of input city from openweathermap geo api
function fetchCoords(city) {

  let locQueryURL = `https://api.openweathermap.org/geo/1.0/direct?q=` + city + `&appid=` + weatherAPIKey;

  fetch(locQueryURL)
    .then(function (response) {
      if (response) {
      return response.json();
      }
    }).then (function(data) { 
      //console.log(data);
      currCityEl.text(`${data[0].name}`);
      lat = data[0].lat;
      lon = data[0].lon;
      // console.log(lat, lon);
      fetchWeather(lat,lon);
    });
  }

// function to get weather information from openweathermap one call api, calls two different render weather functions to modularize current and forecast weather data manipulation
function fetchWeather() {

  let currQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + `&lon=` + lon + `&exclude=minutely,hourly,alerts&units=metric&appid=` + weatherAPIKey;

  fetch(currQueryURL)
  .then(function (response) {
    if (response) {
      return response.json();
    }
  }).then (function(data) {
    // console.log(data);
    renderWeather(data);
    renderForecastCards(data);
    // catch function to notify if the api call has an error
  }) .catch(function(err){
      console.log(err);
    });
}

// function to render current weather data
function renderWeather(data) {

  let today = moment.unix(data.current.dt).format(`MMMM Do, YYYY`);
  //console.log(today);

  dateEl.text(`--${today}`);
  weatherIconEl.attr(`src`, `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
  weatherIconEl.attr(`alt`, data.current.weather[0].description);
  tempEl.text(`Temperature: ${data.current.temp}\u00B0C`);
  humidEl.text(`Humidity: ${data.current.humidity}%`);
  windEl.text(`Wind: ${data.current.wind_speed} km/h`);
  uviEl.text(`UV Index: ${data.current.uvi}`);
  getUVClass(`${data.current.uvi}`);
}

//function to check value of uvi data and assign appropriate class
function getUVClass(num) {
  uviEl.removeClass();
  if (num < 3) {
    uviEl.addClass(`low`);
  } else if (num > 2 && num < 6) {
    uviEl.addClass(`moderate`);
  } else if (num > 5 && num < 8) {
    uviEl.addClass(`high`);
  } else if (num > 7 && num < 10) {
    uviEl.addClass(`very-high`);
  } else  if (num > 9) {
  }
}

// function to render 5-day forecast weather data
function renderForecastCards(data) {
  
  forecastEl.empty();

  for (let i = 0; i < 5 ; i++) {
    // console.log(data.daily[i]);
    let cardInfo = {
    date: moment.unix(data.daily[i].dt).format(`MM/DD/YYYY`),
    iconURL: `src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="${data.daily[i].weather[0].description}"`,
    temp: `${data.daily[i].temp.day}\u00B0C`,
    humidity: `${data.daily[i].humidity} %`,
    wind: `${data.daily[i].wind_speed} km/h`,
    };
    //console.log(cardInfo);
    // console.log(cardInfo.icon);
    let cardFormat = $(`
        <div class="card pt-3 mt-1 mb-3">
          <div class="card-body">
            <h5>${cardInfo.date}</h5>
            <img ${cardInfo.iconURL} />
            <p>Temp: ${cardInfo.temp}</p>
            <p>Humidity: ${cardInfo.humidity}</p>
            <p>Wind Speed: ${cardInfo.wind}</p>
          </div>
        </div>
    `);
  forecastEl.append(cardFormat);
  }
}

// function to create searched city buttons and add input city to local
function renderSearchList(city) {
  
  if (!cities.includes(city)) {
    cities.push(city);
    let pastCity = $(`<li class="list-group-item">${city}</li>`);
    pastSearchesEl.append(pastCity);
  };
  localStorage.setItem(`city`, JSON.stringify(cities));
}

// event listener for search button `click`
searchBtnEl.on(`click`, function(event){
  
  event.preventDefault();
  event.stopPropagation();

  if (searchedCityEl.val() === "") {
    alert("Please enter a city name");
    return;
  }
  let city = searchedCityEl.val().trim().toUpperCase();

  fetchCoords(city);
  renderSearchList(city);

  if (cities.length === 1) {
    $(`#search-results`).show();
  }
});

// event listener for list of past search city clicks
$(document).on(`click`, `.list-group-item`, function(event) {
  
  event.preventDefault();
  event.stopPropagation();
  let pastCity = $(this).text();
  fetchCoords(pastCity);
});

// function to prevent "enter" or "return" being accepted as form input trigger
$(document).on(`keypress`, `form`, function(event) {
  let code = event.keyCode;
  if (code == 13) {
    event.preventDefault();
    return false;
  }
});

// function to load last searched city IF searches saved in local storage, if not hide empty search results fields until input
$(document).ready(function() {

  let cityList = JSON.parse(localStorage.getItem(`city`));

  if (cityList !== null) {
    let lastSearched = cityList.length - 1;
    let lastCity = cityList[lastSearched];
    fetchCoords(lastCity);
    // console.log(`last city: ${lastCity}`);
  } else {
    $(`#search-results`).hide();
  }
});