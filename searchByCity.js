const apiKey = "f570e196a5d7e25fe0936cf08c22e0ea"
const apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function requestCityWeather(city) {
    const response = await fetch(apiUrlCity + city + `&appid=${apiKey}`) 
    const data = await response.json()
    if (response.status === 404) {
        window.alert("Такого города не существует!");
        return;
    }
    console.log(data, "data")

    const temp = Math.round(data.main.temp);
    console.log(temp)
    const humidity = data.main.humidity;
    console.log(humidity)
    const wind = Math.round(data.wind.speed);
    console.log(wind)

    let weatherIconClass = ""
    if (data.weather[0].main === "Clear") {
        weatherIconClass = "fa-solid fa-sun";
      } else if (data.weather[0].main === "Rain") {
        weatherIconClass = "fa-solid fa-cloud-rain";
      } else if (data.weather[0].main === "Mist") {
        weatherIconClass = "fa-solid fa-cloud-mist";
      } else if (data.weather[0].main === "Drizzle") {
        weatherIconClass = "fa-solid fa-cloud-drizzle";
      } else if (data.weather[0].main === "Clouds") {
        weatherIconClass = "fa-solid fa-cloud"
      } else if (data.weather[0].main === "Fog") {
        weatherIconClass = "fa-solid fa-smog"
      }

    return [city, temp, humidity, wind, weatherIconClass]
}

const apiUrlCoords = `http://api.openweathermap.org/geo/1.0/reverse?lat=`;

async function requestCityByCoord(lat, lon) {
    const response = await fetch(apiUrlCoords + lat + `&lon=` + lon + `&limit=3&appid=${apiKey}`);
    const data = await response.json();
    let city = ""
    try {
        city = data[0].name;
    } catch {
        window.alert("Такого города не существуетААААААААААА!")
    }
    console.log(data, "coord")
    return city;
};
//конец БЭКА

//обработка поиска по городу
const cityInput = document.querySelector('.city-input input');
const searchByCityButton = document.querySelector('.city-response');

async function handleCityInput() {
    const inputedCity = cityInput.value;
    cityInput.value = "";
    const inputedCityWeather = await requestCityWeather(inputedCity);
    const weatherCard = createCard(inputedCityWeather);

    const mainHTML = document.querySelector('main');
    mainHTML.appendChild(weatherCard);
}

searchByCityButton.addEventListener("click", handleCityInput);
cityInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        handleCityInput()
    }
});

//обработка поиска по координатам
const latInput = document.querySelector('.lat');
const lonInput = document.querySelector('.lon');
const searchByCoordButton = document.querySelector('.coord-response');

async function handleCoordInput() {
    const inputedLat = latInput.value;
    const inputedLon = lonInput.value;
    latInput.value = "";
    lonInput.value = "";
    const city = await requestCityByCoord(inputedLat, inputedLon);
    const weather = await requestCityWeather(city);
    const weatherCard = createCard(weather);

    const mainHTML = document.querySelector('main');
    mainHTML.appendChild(weatherCard);
}

searchByCoordButton.addEventListener("click", handleCoordInput);
const inputs = [lonInput, latInput];

inputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            handleCoordInput();
        }
    });
});





//смена параметров поиска
const coordButton = document.querySelector(".search-by-coord")
const cityButton = document.querySelector(".search-by-city")

const cityInputFormContainer = document.querySelector('.city-input');
const coordInputFormContainer = document.querySelector('.coord-input');

//сменить поле ввода на координаты
coordButton.addEventListener("click", () => {
    cityInputFormContainer.style.display = 'none';
    coordInputFormContainer.style.display = 'flex';
})

//сменить поле ввода на город
cityButton.addEventListener("click", () => {
    coordInputFormContainer.style.display = 'none';
    cityInputFormContainer.style.display = 'flex';
})

//карточка с параметрами
function createCard(weatherData) {
    const container = document.createElement('div');

    container.innerHTML = `
        <div class="container">
            <button class="fa-solid fa-x close-card"></button>
            <div class="weather">
                <div class="weather-image">
                    <i class="${weatherData[4]}"></i>
                </div>
                <h1 class="temp">${weatherData[1]} &#8451;</h1>
                <h2 class="city">${weatherData[0].charAt(0).toUpperCase() + weatherData[0].slice(1)}</h2>
                <div class="details">
                    <div class="col">
                        <i class="fa-solid fa-water"></i>
                        <div>
                            <p class="humidity">${weatherData[2]}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="col">
                        <i class="fa-solid fa-wind"></i>
                        <div>
                            <p class="wind">${weatherData[3]} km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
                <div id="map" class="map"></div>
            </div>
        </div>
    `;

    const closeCardButton = container.querySelector('.close-card');

    closeCardButton.addEventListener('click', () => {
        container.remove();
    });

    return container;
}


