const apiKey = "f570e196a5d7e25fe0936cf08c22e0ea"
const apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=berlin&appid=${apiKey}`;

async function checkWeather() {
    const response = await fetch(apiUrlCity)
    const data = await response.json()
    console.log(data, "data")

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = data.main.temp
}
checkWeather()

const input = document.querySelector('.input-field');
const coordButton = document.querySelector(".search-by-coord")
const cityButton = document.querySelector(".search-by-city")

coordButton.addEventListener("click", function () {
    input.innerHTML = `
        <div class="coord-input">
            <input type="text" placeholder="Широта">
            <input type="text" placeholder="Долгота">
            <button class="fa-solid fa-search"></button>
        </div>
    `
});

cityButton.addEventListener("click", function () {
    input.innerHTML = `
        <div class="city-input">
            <input type="text" placeholder="Введите город">
            <button class="fa-solid fa-search"></button>
        </div>
    `
});