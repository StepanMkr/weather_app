export async function requestCityWeather(city) {
    const apiKey = "f570e196a5d7e25fe0936cf08c22e0ea"
    const cityApiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
    const response = await fetch(cityApiURL + city + `&appid=${apiKey}`)
    const data = await response.json()
    if (response.status === 404) {
        window.alert("Такого города не существует!");
        return;
    }
    console.log(data, "data")

    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const wind = Math.round(data.wind.speed);
    const weatherIconClass = validateWeatherIcon(data.weather[0].main);
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    return {
        city: city,
        temp: temp,
        humidity: humidity,
        wind: wind,
        weatherIconClass: weatherIconClass,
        lat: lat,
        lon: lon
    };
}

function validateWeatherIcon(dataIcon) {
    const iconMap = {
        "Clear": "fa-solid fa-sun",
        "Rain": "fa-solid fa-cloud-rain",
        "Mist": "fa-solid fa-cloud-mist",
        "Drizzle": "fa-solid fa-cloud-drizzle",
        "Clouds": "fa-solid fa-cloud",
        "Fog": "fa-solid fa-smog"
    };
    return iconMap[dataIcon] || '';
}
