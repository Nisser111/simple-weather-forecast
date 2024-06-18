import _01d from '../assets/weather-icons/01d.svg';
import _01n from '../assets/weather-icons/01n.svg';
import _02d from '../assets/weather-icons/02d.svg';
import _02n from '../assets/weather-icons/02n.svg';
import _03d from '../assets/weather-icons/03d.svg';
import _03n from '../assets/weather-icons/03n.svg';
import _04d from '../assets/weather-icons/04d.svg';
import _04n from '../assets/weather-icons/04n.svg';
import _09d from '../assets/weather-icons/09d.svg';
import _09n from '../assets/weather-icons/09n.svg';
import _10d from '../assets/weather-icons/10d.svg';
import _10n from '../assets/weather-icons/10n.svg';
import _11d from '../assets/weather-icons/11d.svg';
import _11n from '../assets/weather-icons/11n.svg';
import _13d from '../assets/weather-icons/13d.svg';
import _13n from '../assets/weather-icons/13n.svg';
import _50d from '../assets/weather-icons/50d.svg';
import _50n from '../assets/weather-icons/50n.svg';

const weatherIcons = {
    _01d,
    _01n,
    _02d,
    _02n,
    _03d,
    _03n,
    _04d,
    _04n,
    _09d,
    _09n,
    _10d,
    _10n,
    _11d,
    _11n,
    _13d,
    _13n,
    _50d,
    _50n
};


const generalData = (data) => {
    const prefix = '.general-data__';
    const nameOfDayNode = document.querySelector(`${prefix}name-of-day`);
    const dayNode = document.querySelector(`${prefix}date`);
    const locationNode = document.querySelector(`${prefix}location span`);
    const weatherIconNode = document.querySelector(`${prefix}weather-icon`);
    const tempNode = document.querySelector(`${prefix}temp`);
    const descriptionNode = document.querySelector(`${prefix}description`);

    nameOfDayNode.innerText = data.dayName;
    dayNode.innerText = data.formattedDate;
    locationNode.innerText = data.forecastLocation;
    const iconKey = `_${data.weatherIcon}`;
    weatherIconNode.src = weatherIcons[iconKey];
    weatherIconNode.alt = data.weatherDescription;
    const parsedTemp = parseInt(data.temperature);
    tempNode.innerText = `${parsedTemp}°C`;
    descriptionNode.innerText = data.weatherDescription;
}

const forecastStatistics = (data) => {
    const prefix = '.forecast-statistics__';
    const predictibilityNode = document.querySelector(`${prefix}predictibility`);
    const huminidityNode = document.querySelector(`${prefix}huminidity`);
    const windNode = document.querySelector(`${prefix}wind`);
    const airPressureNode = document.querySelector(`${prefix}air-pressure`);
    const maxTempeNode = document.querySelector(`${prefix}max-temp`);
    const minTempNode = document.querySelector(`${prefix}min-temp`);

    predictibilityNode.innerText = Math.round(data.rain) + "%"
    huminidityNode.innerText = Math.round(data.humidity) + "%"
    windNode.innerText = Math.round(data.windSpeed) + " km/h"
    airPressureNode.innerText = Math.round(data.pressure) + " mb"
    maxTempeNode.innerText = parseInt(data.maxTemp) + "°C";
    minTempNode.innerText = parseInt(data.minTemp) + "°C";
}

const getOneDayForecastNode = (image, description, nameOfDay, temperature) => {
    const li = document.createElement("li");
    li.classList.add("five-day-forecast__day");

    const img = document.createElement("img");
    img.classList.add("five-day-forecast__img")
    img.src = weatherIcons[image];
    img.alt = description;
    li.appendChild(img);

    const nameOfDatParagraph = document.createElement("p");
    nameOfDatParagraph.classList.add('five-day-forecast__name-of-day');
    nameOfDatParagraph.innerText = nameOfDay.slice(0, 3)
    li.appendChild(nameOfDatParagraph)

    const tempParagraph = document.createElement("p");
    tempParagraph.classList.add('five-day-forecast__temp');
    tempParagraph.innerText = parseInt(temperature) + "°C";
    li.appendChild(tempParagraph);

    return li;
}

const fiveDatForecast = (data) => {
    const prefix = "five-day-forecast__";
    const container = document.querySelector(".five-day-forecast");
    for (let i = 0; i < 5; i++) {
        const day = data[i];

        const { dayName, weatherIcon, weatherDescription, temperature } = day;
        const iconKey = `_${weatherIcon}`;
        const item = getOneDayForecastNode(iconKey, weatherDescription, dayName, temperature)
        container.appendChild(item);
    }

    const todayElement = document.querySelector(`.${prefix}day`);
    todayElement.classList.add("current");
}

const insertDataToUI = (data) => {
    generalData(data[0]);
    forecastStatistics(data[0])
    fiveDatForecast(data);
}

const reloadData = (data, index) => {
    generalData(data[index]);
    forecastStatistics(data[index])
}

export { insertDataToUI, reloadData }