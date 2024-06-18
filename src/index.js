import { WeatherAPI } from "./components/WeatherApi";
import { fiveDayForecastSelect } from "./components/five-day-forcast-select";
window.onload = async () => {
    fiveDayForecastSelect()

    const apiHandler = new WeatherAPI();
    const data = await apiHandler.getData();

}