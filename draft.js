import { requestCityWeather } from './requestWeather.js';
import { requestCityByCoord } from './requestCity.js';


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
                    <i class="${weatherData.weatherIconClass}"></i>
                </div>
                <h1 class="temp">${weatherData.temp} &#8451;</h1>
                <h2 class="city">${weatherData.city.charAt(0).toUpperCase() + weatherData.city.slice(1)}</h2>
                <div class="details">
                    <div class="col">
                        <i class="fa-solid fa-water"></i>
                        <div>
                            <p class="humidity">${weatherData.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="col">
                        <i class="fa-solid fa-wind"></i>
                        <div>
                            <p class="wind">${weatherData.wind} km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
                <div id="map" class="map-wrapper"></div>
            </div>
        </div>
    `;

    const closeCardButton = container.querySelector('.close-card');

    closeCardButton.addEventListener('click', () => {
        container.remove();
    });

    const mapElement = container.querySelector('.map-wrapper');

    if (weatherData.lat && weatherData.lon) {
        const latitude = weatherData.lat;
        const longitude = weatherData.lon;

        setTimeout(() => {
            // Инициализируем карту
            const map = L.map(mapElement).setView([latitude, longitude], 9);

            // Добавляем OpenStreetMap TileLayer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.invalidateSize();
        }, 100); // Отложим инициализацию на 100 миллисекунд
    }

    return container;
}


