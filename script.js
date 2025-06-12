let city_name = "Seoul";
let lang = "en"; 

const API_KEY = "c3c9c768278b6b9833809629a4069609";
const UNIT = "metric";

async function getData() {
  const API_URL_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=${UNIT}&q=${city_name}&lang=${lang}`;
  const response = await fetch(API_URL_ENDPOINT);
  const data = await response.json();

  const cityName = document.getElementById("city-name");
  const weather = document.getElementById("weather");
  const iconImg = document.getElementById("weather-icon");

  if (data.cod === "404") {
    cityName.innerHTML = `<h1>City not found!</h1>`;
    return;
  }

  cityName.innerHTML = `Weather in ${data.name}`;
  weather.innerHTML = `
    <p>${data.weather[0].description}</p>
    <p>🌡 ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind speed: ${data.wind.speed} km/h</p>`;

  if (iconImg) {
    const icon = data.weather[0].icon;
    iconImg.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
  }
}

function changeCity() {
  const input = document.getElementById("search-input");
  if (input && input instanceof HTMLInputElement) {
    city_name = input.value;
    getData();
  }
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = document.getElementById("toggle-theme");
  icon.textContent = document.body.classList.contains("light") ? "🌙" : "🌞";
});

getData();
