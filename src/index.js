import { WeatherAPI } from "./components/WeatherApi";
import { fiveDayForecastSelect } from "./components/five-day-forcast-select";
import { insertDataToUI } from "./components/insertDataToUI";
import { handleReloadForecast } from "./components/handleReloadForecast";

window.onload = async () => {

    const apiHandler = new WeatherAPI();
    const data = await apiHandler.getData();

    // Insert data to UI
    insertDataToUI(data, 0)

    handleReloadForecast(data);

    fiveDayForecastSelect()

}