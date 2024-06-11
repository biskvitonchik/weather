import { WeatherAPI } from "./api.js";
import { WeatherDataProcessor } from "./dataProcessing.js";
import { UI } from "./ui.js";

const API_KEY = "7023c4f8b61573243ceb881918b43235";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";

const weatherAPI = new WeatherAPI(API_KEY, BASE_URL);
const weatherDataProcessor = new WeatherDataProcessor();
const ui = new UI();

const searchInput = document.querySelector(".search__input");
const searchIcon = document.querySelector(".search__btn--icon");
const myForm = document.querySelector(".myForm");
const loader = document.querySelector(".loader");

searchIcon.addEventListener("click", handleSearch);
myForm.addEventListener("submit", handleSearch);

async function handleSearch(event) {
  if (event) event.preventDefault();
  const query = searchInput.value.trim();
  
  if (query) {
    loader.style.display = "block";
    try {
      const data = await weatherAPI.fetchData(query);
      ui.updateUI(data);
      const { maxTemperatureByDay, iconsByDay } = weatherDataProcessor.processWeatherData(data);
      ui.createWeekCard(maxTemperatureByDay, iconsByDay);
    } catch (error) {
      ui.showError(query);
    } finally {
      searchInput.value = "";
      loader.style.display = "none";
    }
  }
}