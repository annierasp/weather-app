// Date
function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = `${day} ${hour}:${minutes}`;
  return today;
}

let date = document.querySelector("h3");
date.innerHTML = currentDate(new Date());

// Default city

function search(city) {
  let apiKey = "080cbfa2309f6d5006d04e646210a21b";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

// Search

function searchCityValue(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-name").value;
  search(city);
}

let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", searchCityValue);

// Weather

function showWeather(response) {
  document.querySelector("#current-teperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

search("Kyiv");

//Current Button

function currentCityValue(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=080cbfa2309f6d5006d04e646210a21b`;
  axios.get(url).then(showWeather);
}

let currentCity = document.querySelector("#current-city-temperature");
currentCity.addEventListener("click", currentCityValue);
