const API_KEY = "7023c4f8b61573243ceb881918b43235";
const URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const wrapper = document.querySelector(".wrapper");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather__icon");
const loader = document.querySelector(".loader");
const degrees = document.querySelector(".weather__degrees");
const cityName = document.querySelector(".weather__city");
const searchInput = document.querySelector(".search__input");
const searchIcon = document.querySelector(".search__btn--icon");
const myForm = document.querySelector(".myForm");
const parameters = document.querySelector(".parameters");
const speedWind = document.querySelector(".parameters__speed-wind");
const humidity = document.querySelector(".parameters__humidity");
const errorMessage = document.querySelector(".error-message");

const data = [];

searchIcon.addEventListener("click", () => {
  getData(searchInput.value);
  searchInput.value = "";
});

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (searchInput.value) {
    getData(searchInput.value);
    searchInput.value = "";
  }
});

async function getData(city) {
  try {
    const response = await fetch(URL + city + "&appid=" + API_KEY);
    const data = await response.json();
    degrees.innerHTML = Math.floor(data.list[0].main.temp - 273.15) + "&#176;";
    cityName.innerHTML = data.city.name;
    speedWind.innerHTML = "wind: " + data.list[0].wind.speed + "m/s";
    humidity.innerHTML = "humidity: " + data.list[0].main.humidity + "%";
    weather.style.display = "flex";
    console.log(data);
    weatherIcon.style.display = "flex";
    parameters.style.display = "flex";
    errorMessage.style.display = "none";
    if (data.list[0].weather[0].main === "Clouds") {
      wrapper.style.backgroundImage = "url('/public/images/clouds.jpg')";
      weatherIcon.src = "/public/icons/cloudsIcon.png";
    } else if (data.list[0].weather[0].main === "Clear") {
      wrapper.style.backgroundImage = "url('/public/images/clearSky.jpg')";
      weatherIcon.src = "/public/icons/sunIcon.png";
    } else if (data.list[0].weather[0].main === "Rain") {
      wrapper.style.backgroundImage = "url('/public/images/rain.jpg')";
      weatherIcon.src = "/public/icons/rainIcon.png";
    } else if (data.list[0].weather[0].main === "Mist") {
      wrapper.style.backgroundImage = "url('/public/images/mist.png')";
      weatherIcon.src = "/public/icons/mistIcon.png";
    } else if (data.list[0].weather[0].main === "Haze") {
      wrapper.style.backgroundImage = "url('/public/images/haze.jpg')";
      weatherIcon.src = "/public/icons/hazeIcon.png";
    }
  } catch (error) {
    console.log(error.message);
    weather.style.display = "none";
    weatherIcon.style.display = "none";
    parameters.style.display = "none";
    errorMessage.innerHTML = "City not found";
    errorMessage.style.display = "block";
  }
}
