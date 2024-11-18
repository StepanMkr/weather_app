import { requestCityWeather } from './requestWeather.js';
import { geocodeCoords } from './requestCity.js';
import { createCard } from './createWeatherCard.js';
import { switchInputFormsListeners } from './switchInputFields.js';


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
        handleCityInput();
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
    const city = await geocodeCoords(inputedLat, inputedLon);
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

switchInputFormsListeners();