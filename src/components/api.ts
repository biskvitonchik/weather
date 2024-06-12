export class WeatherAPI {
apiKey: string;
baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async fetchData(city: string) {
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