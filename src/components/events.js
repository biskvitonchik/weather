import { fetchData } from "../components/api.js";
import { updateUI, showError, createWeekCard } from "./ui.js";
import { processWeatherData } from "./dataProcessing.js";

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
    loader.style.display = 'block';
    try {
      const data = await fetchData(query);
      updateUI(data);
      const { maxTemperatureByDay, iconsByDay } = processWeatherData(data);
      createWeekCard(maxTemperatureByDay, iconsByDay);
    } catch (error) {
      showError(query);
    } finally {
      searchInput.value = "";
      loader.style.display = 'none';
    }
  }
}
