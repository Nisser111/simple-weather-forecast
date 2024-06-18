/**
 * Class representing a WeatherAPI for fetching and formatting weather data.
 */
class WeatherAPI {
    #apiKey = "c5b66c41e5d182bdfda14a673512c0af";
    #apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
    city = "warsaw";

    /**
     * Asynchronously fetches weather data from the API.
     * @returns {Promise} A promise that resolves to the formatted weather data.
     */
    async getData() {
        try {
            const response = await fetch(`${this.#apiUrl}?q=${this.city}&appid=${this.#apiKey}&units=metric`);

            if (response.ok) {
                const parsed = await response.json();
                const formattedData = this.formatData(parsed);
                return formattedData
            }

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Sets a new city for weather data retrieval.
     * @param {string} newCity - The new city to set.
     */
    setCity(newCity) {
        this.city = newCity;
    }

    /**
     * Formats the raw weather data into a structured format.
     * @param {Object} data - The raw weather data to format.
     * @returns {Array} An array of formatted weather data objects.
     */
    formatData(data) {
        const today = new Date().toISOString().split('T')[0];
        const forecastLocation = data.city.name;
        const groupedData = {};

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toISOString().split('T')[0];
            const isToday = dayKey === today;
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const monthName = date.toLocaleDateString('en-US', { month: 'long' });
            const dayNumber = date.toLocaleDateString('en-US', { day: 'numeric' });
            const daySuffix = this.#getDaySuffix(dayNumber);
            const formattedDate = `${monthName} ${dayNumber}${daySuffix}`;

            if (!groupedData[dayKey]) {
                groupedData[dayKey] = {
                    dayName,
                    formattedDate,
                    forecastLocation,
                    temperature: isToday ? item.main.temp : item.main.temp_max,
                    weatherDescription: item.weather[0].description,
                    weatherIcon: item.weather[0].icon,
                    rain: isToday ? item.rain?.['3h'] || 0 : item.pop,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed,
                    pressure: item.main.pressure,
                    maxTemp: item.main.temp_max,
                    minTemp: item.main.temp_min,
                    count: 1
                };
            } else {
                groupedData[dayKey].temperature = isToday ? item.main.temp : Math.max(groupedData[dayKey].temperature, item.main.temp_max);
                groupedData[dayKey].rain = isToday ? item.rain?.['3h'] || 0 : Math.max(groupedData[dayKey].rain, item.pop);
                groupedData[dayKey].humidity = (groupedData[dayKey].humidity * groupedData[dayKey].count + item.main.humidity) / (groupedData[dayKey].count + 1);
                groupedData[dayKey].windSpeed = Math.max(groupedData[dayKey].windSpeed, item.wind.speed);
                groupedData[dayKey].pressure = (groupedData[dayKey].pressure * groupedData[dayKey].count + item.main.pressure) / (groupedData[dayKey].count + 1);
                groupedData[dayKey].maxTemp = Math.max(groupedData[dayKey].maxTemp, item.main.temp_max);
                groupedData[dayKey].minTemp = Math.min(groupedData[dayKey].minTemp, item.main.temp_min);
                groupedData[dayKey].count += 1;
            }
        });

        return Object.values(groupedData).map(day => {
            delete day.count;
            return day;
        });
    }

    /**
     * Private method to get the suffix for a day number.
     * @param {number} day - The day number to get the suffix for.
     * @returns {string} The suffix for the day number.
     */
    #getDaySuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
}

export { WeatherAPI };