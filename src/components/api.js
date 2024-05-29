const API_KEY = "7023c4f8b61573243ceb881918b43235";
const URL = "https://api.openweathermap.org/data/2.5/forecast?q=";

export async function fetchData(city) {
  try {
    const response = await fetch(`${URL}${city}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
