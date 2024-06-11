export class WeatherAPI {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async fetchData(city) {
    try {
      const response = await fetch(`${this.baseUrl}${city}&appid=${this.apiKey}`);
      if (!response.ok) {
        throw new Error("city not found");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}