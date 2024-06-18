import { WeatherAPI } from "./components/WeatherApi";
import { fiveDayForecastSelect } from "./components/five-day-forcast-select";
import WeatherUI from "./components/WeatherUI";
import { handleReloadForecast } from "./components/handleReloadForecast";

window.onload = async () => {
    // Instance of weather api hanlder
    const apiHandler = new WeatherAPI();
    // Get data from handler
    const data = await apiHandler.getData();
    // Instance of UI handler
    const weatherUIHandler = new WeatherUI(data)

    // After initliazize of DOM insert weather forecast data
    weatherUIHandler.insertDataToUI(data, 0)

    // Initialize listener which handles swiching between days
    handleReloadForecast(weatherUIHandler, data);

    // Initlialize swiching class `current` in five-day forecast
    fiveDayForecastSelect()

}