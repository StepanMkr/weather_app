export async function geocodeCoords(lat, lon) {
    const apiKey = "f570e196a5d7e25fe0936cf08c22e0ea";
    const apiUrlCoords = `http://api.openweathermap.org/geo/1.0/reverse?lat=`;
    const response = await fetch(apiUrlCoords + lat + `&lon=` + lon + `&limit=3&appid=${apiKey}`);
    const data = await response.json();
    let city = "";
    try {
        city = data[0].name;
    } catch {
        window.alert("Такого города не существует!");
    }
    console.log(data, "coord");
    return city;
};