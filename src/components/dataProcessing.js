export class WeatherDataProcessor {
  processWeatherData(data) {
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
}