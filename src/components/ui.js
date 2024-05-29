const wrapper = document.querySelector(".wrapper");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather__icon");
const degrees = document.querySelector(".weather__degrees");
const cityName = document.querySelector(".weather__city");
const parameters = document.querySelector(".parameters");
const speedWind = document.querySelector(".parameters__speed-wind");
const humidity = document.querySelector(".parameters__humidity");
const errorMessage = document.querySelector(".error-message");
const weekCard = document.querySelector(".week");
const forecastInscription = document.querySelector(".forecast-inscription");

export function updateUI(data) {
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

export function createWeekCard(maxTemperatureByDay, iconsByDay) {
  weekCard.textContent = "";
  weekCard.style.display = "flex";
  let count = 0;

  for (const [date, maxTemp] of Object.entries(maxTemperatureByDay)) {
    if (count >= 4) break;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
              <h3>${date}</h3>
              <img src="${getIconSrc(iconsByDay[date])}" alt="${
      iconsByDay[date]
    }" />
              <p>${maxTemp}°</p>
          `;
    forecastInscription.style.display = "block";
    weekCard.appendChild(card);
    count++;
  }
}

export function getIconSrc(weatherType) {
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

export function showError(cityName) {
  weekCard.textContent = "";
  errorMessage.textContent = `City: '${cityName}' not found`;
  errorMessage.style.display = "block";
  weather.style.display = "none";
  parameters.style.display = "none";
  forecastInscription.style.display = "none";
  wrapper.style.backgroundImage = "url('public/images/Oops.png')";
}
