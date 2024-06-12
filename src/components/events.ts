import { WeatherAPI } from "./api.ts";
import { WeatherDataProcessor } from "./dataProcessing.ts";
import { UI } from "./ui.ts";

const API_KEY = "7023c4f8b61573243ceb881918b43235";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";

const weatherAPI = new WeatherAPI(API_KEY, BASE_URL);
const weatherDataProcessor = new WeatherDataProcessor();
const ui = new UI();

const searchInput = document.querySelector(".search__input") as HTMLInputElement | null;
const searchIcon = document.querySelector(".search__btn--icon") as HTMLElement | null;
const myForm = document.querySelector(".myForm") as HTMLFormElement | null;
const loader = document.querySelector(".loader") as HTMLElement | null;

if (searchInput && searchIcon && myForm && loader) {
  searchIcon.addEventListener("click", handleSearch);
  myForm.addEventListener("submit", handleSearch);
}

async function handleSearch(event?: Event) {
  if (event && searchInput) {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (query) {
      if (loader) {
        loader.style.display = "block";
      }
      try {
        const data = await weatherAPI.fetchData(query);
        ui.updateUI(data);
        const { maxTemperatureByDay, iconsByDay } = weatherDataProcessor.processWeatherData(data);
        ui.createWeekCard(maxTemperatureByDay, iconsByDay);
      } catch (error) {
        ui.showError(query);
      } finally {
        if (searchInput && loader) {
          searchInput.value = "";
          loader.style.display = "none";
        }
      }
    }
  }
}