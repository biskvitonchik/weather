const API_KEY = "7023c4f8b61573243ceb881918b43235";
const URL = "https://api.openweathermap.org/data/2.5/forecast?q=";

const wrapper = document.querySelector(".wrapper");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather__icon");
const degrees = document.querySelector(".weather__degrees");
const cityName = document.querySelector(".weather__city");
const searchInput = document.querySelector(".search__input");
const searchIcon = document.querySelector(".search__btn--icon");
const myForm = document.querySelector(".myForm");
const parameters = document.querySelector(".parameters");
const speedWind = document.querySelector(".parameters__speed-wind");
const humidity = document.querySelector(".parameters__humidity");
const errorMessage = document.querySelector(".error-message");
const weekCard = document.querySelector(".week");
const forecastInscription = document.querySelector(".forecast-inscription");

searchIcon.addEventListener("click", handleSearch);
myForm.addEventListener("submit", handleSearch);

async function fetchData(city) {
  try {
    const response = await fetch(`${URL}${city}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    updateUI(data);
    const { maxTemperatureByDay, iconsByDay } = processWeatherData(data);
    createWeekCard(maxTemperatureByDay, iconsByDay);
  } catch (error) {
    weekCard.textContent = "";
    errorMessage.textContent = `City: '${searchInput.value}' not found`;
    errorMessage.style.display = "block";
    weather.style.display = "none";
    parameters.style.display = "none";
    forecastInscription.style.display = "none";
    wrapper.style.backgroundImage = "url('images/Oops.png')";
  }
}

async function handleSearch(event) {
  if (event) event.preventDefault();
  const query = searchInput.value.trim();
  
  if (query) {
    try {
      console.log(event);
      await fetchData(query);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      searchInput.value = "";
    }
  }
}

function updateUI(data) {
  degrees.innerHTML = Math.floor(data.list[0].main.temp - 273.15) + "&#176;";
  cityName.innerHTML = data.city.name;
  speedWind.innerHTML = "wind: " + data.list[0].wind.speed + "m/s";
  humidity.innerHTML = "humidity: " + data.list[0].main.humidity + "%";
  weather.style.display = "flex";
  weatherIcon.style.display = "flex";
  parameters.style.display = "flex";
  errorMessage.style.display = "none";

  const weatherType = data.list[0].weather[0].main;

  switch (weatherType) {
    case "Clouds":
      wrapper.style.backgroundImage = "url('public/images/clouds.jpg')";
      weatherIcon.src = "public/icons/cloudsIcon.png";
      break;
    case "Clear":
      wrapper.style.backgroundImage = "url('public/images/clearSky.jpg')";
      weatherIcon.src = "public/icons/sunIcon.png";
      break;
    case "Rain":
      wrapper.style.backgroundImage = "url('public/images/rain.jpg')";
      weatherIcon.src = "public/icons/rainIcon.png";
      break;
    case "Mist":
      wrapper.style.backgroundImage = "url('public/images/mist.png')";
      weatherIcon.src = "public/icons/mistIcon.png";
      break;
    case "Haze":
      wrapper.style.backgroundImage = "url('public/images/haze.jpg')";
      weatherIcon.src = "public/icons/hazeIcon.png";
      break;
    default:
      wrapper.style.backgroundImage = "none";
      weatherIcon.src = "public/icons/defaultIcon.png";
  }
}

function processWeatherData(data) {
  const maxTemperatureByDay = {};
  const iconsByDay = {};
  const todayDate = data.list[0].dt_txt.split(" ")[0].split("-")[2];

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0].split("-")[2];
    const maxTemp = Math.round(item.main.temp_max - 273.15);
    const time = item.dt_txt.split(" ")[1];

    if (date === todayDate) return;

    if (!maxTemperatureByDay[date]) {
      maxTemperatureByDay[date] = maxTemp;
    } else if (maxTemp > maxTemperatureByDay[date]) {
      maxTemperatureByDay[date] = maxTemp;
    }

    if (time === "15:00:00") {
      iconsByDay[date] = item.weather[0].main;
    }
  });
  return { maxTemperatureByDay, iconsByDay };
}

function createWeekCard(maxTemperatureByDay, iconsByDay) {
  weekCard.textContent = "";
  weekCard.style.display = "flex";
  let count = 0;

  for (const [date, maxTemp] of Object.entries(maxTemperatureByDay)) {
    if (count >= 4) break;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <h3>${date}</h3>
            <img src="${getIconSrc(iconsByDay[date])}" alt="${iconsByDay[date]}" />
            <p>${maxTemp}°</p>
        `;
    forecastInscription.style.display = "block";
    weekCard.appendChild(card);
    count++;
  }
}

function getIconSrc(weatherType) {
  switch (weatherType) {
    case "Clouds":
      return "public/icons/cloudsIcon.png";
    case "Clear":
      return "public/icons/sunIcon.png";
    case "Rain":
      return "public/icons/rainIcon.png";
    case "Mist":
      return "public/icons/mistIcon.png";
    case "Haze":
      return "public/icons/hazeIcon.png";
    default:
      return "public/icons/defaultIcon.png";
  }
}
