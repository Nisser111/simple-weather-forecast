import { WeatherAPI } from "./components/WeatherApi";
import { fiveDayForecastSelect } from "./components/five-day-forcast-select";
import { insertDataToUI } from "./components/insertDataToUI";

window.onload = async () => {
    fiveDayForecastSelect()

    const apiHandler = new WeatherAPI();
    const data = await apiHandler.getData();

    // Insert data to UI
    insertDataToUI(data)
}