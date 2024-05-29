import { fetchData } from "../components/api";
import { updateUI, showError, createWeekCard } from "./ui";
import { processWeatherData } from "./dataProcessing";

const searchInput = document.querySelector(".search__input");
const searchIcon = document.querySelector(".search__btn--icon");
const myForm = document.querySelector(".myForm");

searchIcon.addEventListener("click", handleSearch);
myForm.addEventListener("submit", handleSearch);

async function handleSearch(event) {
  if (event) event.preventDefault();
  const query = searchInput.value.trim();

  if (query) {
    try {
      const data = await fetchData(query);
      updateUI(data);
      const { maxTemperatureByDay, iconsByDay } = processWeatherData(data);
      createWeekCard(maxTemperatureByDay, iconsByDay);
    } catch (error) {
      showError(query);
    } finally {
      searchInput.value = "";
    }
  }
}
