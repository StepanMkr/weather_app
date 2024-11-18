export function switchInputFormsListeners() {
    const coordButton = document.querySelector(".search-by-coord");
    const cityButton = document.querySelector(".search-by-city");

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
}