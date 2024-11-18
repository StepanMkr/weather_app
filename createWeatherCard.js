export function createCard(weatherData) {

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

    generateMap(weatherData, container.querySelector('.map-wrapper'));
    container.querySelector('.close-card').addEventListener('click', () => container.remove());
    return container;
}

function generateMap(weatherData, mapElement) {

    if (weatherData.lat && weatherData.lon) {
        const latitude = weatherData.lat;
        const longitude = weatherData.lon;

        setTimeout(() => {

            const map = L.map(mapElement).setView([latitude, longitude], 9);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            map.invalidateSize();
            
        }, 100);
    }
}
