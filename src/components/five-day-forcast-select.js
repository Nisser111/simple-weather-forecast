/**
 * Attaches click event listeners to day elements in the five-day forecast.
 * Clicking a day updates the 'current' class to highlight the selected day.
 */
const fiveDayForecastSelect = () => {
    const list = Array.from(document.querySelectorAll(".five-day-forecast__day"));
    let current = document.querySelector(".five-day-forecast__day.current");

    list.forEach((el) => el.addEventListener("click", () => {
        current.classList.remove("current");
        el.classList.add("current");
        current = el;
    }));
}

export { fiveDayForecastSelect }