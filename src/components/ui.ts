export class UI {
  wrapper: HTMLDivElement;
  weather: HTMLElement;
  weatherIcon: HTMLImageElement;
  degrees: HTMLDivElement;
  cityName: HTMLDivElement;
  parameters: HTMLElement;
  speedWind: HTMLDivElement;
  humidity: HTMLDivElement;
  errorMessage: HTMLDivElement;
  weekCard: HTMLElement;
  forecastInscription: HTMLParagraphElement;

  constructor() {
    this.wrapper = document.querySelector(".wrapper")!;
    this.weather = document.querySelector(".weather")!;
    this.weatherIcon = document.querySelector(".weather__icon")!;
    this.degrees = document.querySelector(".weather__degrees")!;
    this.cityName = document.querySelector(".weather__city")!;
    this.parameters = document.querySelector(".parameters")!;
    this.speedWind = document.querySelector(".parameters__speed-wind")!;
    this.humidity = document.querySelector(".parameters__humidity")!;
    this.errorMessage = document.querySelector(".error-message")!;
    this.weekCard = document.querySelector(".week")!;
    this.forecastInscription = document.querySelector(".forecast-inscription")!;
  }

  updateUI(data: any) {
    this.degrees.innerHTML =
      Math.floor(data.list[0].main.temp - 273.15) + "&#176;";
    this.cityName.innerHTML = data.city.name;
    this.speedWind.innerHTML = "wind: " + data.list[0].wind.speed + "m/s";
    this.humidity.innerHTML = "humidity: " + data.list[0].main.humidity + "%";
    this.weather.style.display = "flex";
    this.weatherIcon.style.display = "flex";
    this.parameters.style.display = "flex";
    this.errorMessage.style.display = "none";

    const weatherType = data.list[0].weather[0].main;
    this.setBackgroundAndIcon(weatherType);
  }

  setBackgroundAndIcon(weatherType: string) {
    const weatherConfig: Record<string, { background: string; icon: string }> =
      {
        Clouds: {
          background: `${import.meta.env.BASE_URL}/images/clouds.jpg`,
          icon: `${import.meta.env.BASE_URL}/icons/cloudsIcon.png`,
        },
        Clear: {
          background: `${import.meta.env.BASE_URL}/images/clearSky.jpg`,
          icon: `${import.meta.env.BASE_URL}/icons/sunIcon.png`,
        },
        Rain: {
          background: `${import.meta.env.BASE_URL}/images/rain.jpg`,
          icon: `${import.meta.env.BASE_URL}/icons/rainIcon.png`,
        },
        Mist: {
          background: `${import.meta.env.BASE_URL}/images/mist.png`,
          icon: `${import.meta.env.BASE_URL}/icons/mistIcon.png`,
        },
        Haze: {
          background: `${import.meta.env.BASE_URL}/images/haze.jpg`,
          icon: `${import.meta.env.BASE_URL}/icons/hazeIcon.png`,
        },
        default: {
          background: "none",
          icon: `${import.meta.env.BASE_URL}/icons/defaultIcon.png`,
        },
      };

    const { background, icon } =
      weatherConfig[weatherType] || weatherConfig.default;
    this.wrapper.style.backgroundImage = `url('${background}')`;
    this.weatherIcon.src = icon;
  }

  createWeekCard(
    maxTemperatureByDay: { [key: string]: number },
    iconsByDay: { [key: string]: string }
  ) {
    this.weekCard.textContent = "";
    this.weekCard.style.display = "flex";
    let count = 0;

    for (const [date, maxTemp] of Object.entries(maxTemperatureByDay)) {
      if (count >= 4) break;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${date}</h3>
        <img src="${this.getIconSrc(iconsByDay[date])}" alt="${iconsByDay[date]}"/>
        <p>${maxTemp}°</p>
      `;
      this.forecastInscription.style.display = "block";
      this.weekCard.appendChild(card);
      count++;
    }
  }

  getIconSrc(weatherType: string): string {
    const weatherIcons: Record<string, string> = {
      Clouds: `${import.meta.env.BASE_URL}/icons/cloudsIcon.png`,
      Clear: `${import.meta.env.BASE_URL}/icons/sunIcon.png`,
      Rain: `${import.meta.env.BASE_URL}/icons/rainIcon.png`,
      Mist: `${import.meta.env.BASE_URL}/icons/mistIcon.png`,
      Haze: `${import.meta.env.BASE_URL}/icons/hazeIcon.png`,
      default: `${import.meta.env.BASE_URL}/icons/defaultIcon.png`,
    };
    return weatherIcons[weatherType] || weatherIcons.default;
  }

  showError(cityName: string) {
    this.weekCard.textContent = "";
    this.errorMessage.textContent = `City: '${cityName}' not found`;
    this.errorMessage.style.display = "block";
    this.weather.style.display = "none";
    this.parameters.style.display = "none";
    this.forecastInscription.style.display = "none";
    this.wrapper.style.backgroundImage = "none";
  }
}
