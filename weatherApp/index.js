const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".search-button");
const weatherImg = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const weather = document.querySelector(".weather");
const errorMessage = document.querySelector(".error-message");

const apikey = "77ffa8eb734e089ecf05f1b7f3b880f2";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);

  if (!response.ok) {
    errorMessage.style.display = "block";
    weather.style.display = "none";
    return;
  }
  errorMessage.style.display = "none";

  var data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  temperature.innerHTML = Math.round(data.main.temp) + "°c";
  humidity.innerHTML = data.main.humidity + "%";
  windSpeed.innerHTML = data.wind.speed + " " + "km/hr";

  if (data.weather[0].main == "Clouds") {
    weatherImg.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherImg.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherImg.src = "images/clouds.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherImg.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherImg.src = "images/mist.png";
  }

  weather.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
