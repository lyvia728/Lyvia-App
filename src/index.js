function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let HumidityElement = document.querySelector("#Humidity");
    let WindElement = document.querySelector("#Wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
  
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    HumidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    WindElement.innerHTML = `${response.data.wind.speed} km/h`;
    temperatureElement.innerHTML = Math.round(temperature);

} 
function formatDate(date) {

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = ["Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"];
    
    let day = days[date.getDay()];

   return `${day} ${hours}:${minutes}`; 


}
function searchCity(city) { 
    let apiKey = "eba2o4c7f9e18e3f1t9e2154f4dd3105";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    
    axios.get(apiUrl).then(refreshWeather);
}



function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}

function displayForecast(){
let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let forecastHTML = "";

    days.forEach(function (day) {
        forecastHTML =
        forecastHTML +
        `
  <div class="weather-forecast-day">
<div class="weather-forecast-date">${day}</div>
<div class="weather-forecast-icon">🌤️ </div>
<div class="weather-forecast-temperatures">
<div class="weather-forecast-temperature"><strong>15&deg; </strong>
 </div>
 <div class="weather-forecast-temperature">9&deg; </div>
 </div>
 </div>
  `;
    });
    

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;

}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit); 

searchCity("South Africa");
displayForecast();



