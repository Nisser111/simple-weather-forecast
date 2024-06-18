import { WeatherAPI } from "./components/WeatherApi";
import { fiveDayForecastSelect } from "./components/five-day-forcast-select";
import WeatherUI from "./components/WeatherUI";
import { handleReloadForecast } from "./components/handleReloadForecast";

window.onload = async () => {

    const apiHandler = new WeatherAPI();
    const data = await apiHandler.getData();
    const weatherUIHandler = new WeatherUI(data)

    // Insert data to UI
    weatherUIHandler.insertDataToUI(data, 0)

    handleReloadForecast(weatherUIHandler, data);

    fiveDayForecastSelect()

}