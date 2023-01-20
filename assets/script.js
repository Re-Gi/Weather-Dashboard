//get coordinates: http://api.openweathermap.org/geo/1.0/direct?q={city}}&limit=1&appid=07220a51e95b28fddb66e8043de4c734
//get current weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=07220a51e95b28fddb66e8043de4c734
//get 5-day forecast: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=07220a51e95b28fddb66e8043de4c734
// weather icon url: https://openweathermap.org/img/wn/{icon}.png

var searchBtn = document.querySelector('.btn-primary');
var inputEl = document.querySelector('input');

function getCoordinates() {
    console.log("getting coords: " + inputEl.value);
    var geoAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputEl.value + "&limit=1&appid=07220a51e95b28fddb66e8043de4c734"

    fetch(geoAPI)
    .then((response) => {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then((geoRes) => {
        console.log(geoRes);
        getCurrentWeather(geoRes);
        // getForecast(geoRes);
    })
    .catch((error) => {
        console.error(error);
    });
}

function getCurrentWeather(geoRes) {
    var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat=" + geoRes[0].lat + "&lon=" + geoRes[0].lon + "&appid=07220a51e95b28fddb66e8043de4c734&units=imperial";

    fetch(currentWeatherAPI)
    .then((response) => {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then((cwRes) => {
        console.log(cwRes);
        displayCurrentWeather(cwRes);
    })
    .catch((error) => {
        console.error(error);
    });
}

// function getForecast(geoRes) {
//     var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + geoRes[0].lat + "&lon=" + geoRes[0].lon + "&appid=07220a51e95b28fddb66e8043de4c734";

//     fetch(forecastAPI)
//     .then((response) => {
//         if(!response.ok) {
//             throw response.json();
//         }
//         return response.json();
//     })
//     .then((fcRes) => {
//         console.log(fcRes);
//         displayForecast(fcRes);
//     })
//     .catch((error) => {
//         console.error(error);
//     });
// }


// function displayCurrentWeather(data) {
//     var weatherDiv = document.createElement('div');
//     weatherDiv.setAttribute('class', 'card-body');
//     weatherDiv.setAttribute('id', 'weather-div');

//     var cityNameEl = document.createElement('h2');
//     cityNameEl.setAttribute('class', 'city-name');

//     var tempEl = document.createElement('p');
//     var windEl = document.createElement('p');
//     var humidityEl = document.createElement('p');

//     cityNameEl.textContent = data.name + " (" + dayjs.unix(data.dt).format('M/DD/YYYY') + ") ";
//     tempEl.textContent = "Temp: " + data.main.temp + "°F";
//     windEl.textContent = "Wind: " + data.wind.speed + " MPH";
//     humidityEl.textContent = "Humidity: " + data.main.humidity + " %";

//     var weatherResDiv = document.querySelector('#weather-results');
    
//     weatherDiv.appendChild(cityNameEl);
//     weatherDiv.appendChild(tempEl);
//     weatherDiv.appendChild(windEl);
//     weatherDiv.appendChild(humidityEl);
//     weatherResDiv.appendChild(weatherDiv);
// }

var data = {
    dt: "date",
    name: "cityname",
    main: {
        temp:"temp",
        humidity:"humidity"
    },
    wind: {
        speed: "wind speed",
    },
    icon: '04n',
}

function displayCurrentWeather() {
    document.querySelector('#weather-div').setAttribute('style', 'display:block;');

    document.querySelector('#city-name').textContent = data.name + " (" + dayjs.unix(data.dt).format('M/DD/YYYY') + ") ";

    var iconUrl = 'https://openweathermap.org/img/wn/' + data.icon + '.png';
    document.querySelector('#current-icon').setAttribute('src', iconUrl);

    document.querySelector('#current-temp').textContent = "Temp: " + data.main.temp + "°F";
    document.querySelector('#current-wind').textContent = "Wind: " + data.wind.speed + " MPH";
    document.querySelector('#current-humidity').textContent = "Humidity: " + data.main.humidity + " %";

}

function displayForecast() {
    document.querySelector('#forecast-div').setAttribute('style', 'display:block;');

    // for-loop 5-day array

    tempEl.textContent = "Temp: " + data.main.temp + "°F";
    windEl.textContent = "Wind: " + data.wind.speed + " MPH";
    humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
}

// searchBtn.addEventListener('click', getCoordinates)
searchBtn.addEventListener('click', displayCurrentWeather)