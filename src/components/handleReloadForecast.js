import { reloadData } from "./insertDataToUI";

const handleReloadForecast = (data) => {
    const fiveDayForecastList = Array.from(document.querySelectorAll(".five-day-forecast__day"));

    fiveDayForecastList.forEach((item, index) => {
        item.addEventListener("click", () => {
            reloadData(data, index)
        })
    })
}

export { handleReloadForecast }