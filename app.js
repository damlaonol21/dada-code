function getTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
function showCity(response) {
  document.querySelector("#citySearchResult").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function gather(city) {
  let apiKey = "dff8bb45a54a7942efbd8b90e1cf34fc";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCity);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  gather(city);
}
function displayCurrentLocation(position) {
  let apiKey = "dff8bb45a54a7942efbd8b90e1cf34fc";
  let units = "metric";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}5&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiEndPoint).then(showCity);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);
let currentDayTime = new Date();

let li = document.querySelector("#day-time");
li.innerHTML = getTime(currentDayTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let temperatureElement = document.querySelector("#temperature");
let celsiusTemperature = temperatureElement.innerHTML;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

gather("Madrid");