/**
 * Function to handle swiching events in five-day forecast
 * @param {WeatherUI} weatherUIHandler 
 */
const handleReloadForecast = (weatherUIHandler) => {
    const fiveDayForecastList = Array.from(document.querySelectorAll(".five-day-forecast__day"));

    fiveDayForecastList.forEach((item, index) => {
        item.addEventListener("click", () => {
            weatherUIHandler.reloadData(index);
            // Set selected index to session storage
            sessionStorage.setItem("weatherForecastItem", index);
        })
    })
}

export { handleReloadForecast }