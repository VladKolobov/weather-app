const searchBar = document.querySelector('.search-bar');
const weatherDetails = document.querySelector('.weather-details');

window.addEventListener("load", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess);
    }
})

function onSuccess(position){
    const {latitude, longitude} = position.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=24908a36f690ac862b1a585865f2b0e3`)
        .then(response => response.json())
        .then(weatherData => renderMarkup(weatherData))
}

searchBar.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        fetchWeatherDetails()
    }
})

function fetchWeatherDetails() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getCityName()}&appid=24908a36f690ac862b1a585865f2b0e3&units=metric&lang=ru`)
        .then(response => response.json())
        .then(weatherData => renderMarkup(weatherData))
}

function getCityName() {
    let value;
    if(searchBar.value !== "") {
        value = searchBar.value
        return value
    }
}

function getWeatherIcon(weatherData) {
    const id = weatherData.weather[0].id;

    if(id >= 200 && id <= 232) {
        return 'http://openweathermap.org/img/wn/11d@4x.png'
    }else if(id >= 300 && id <= 321) {
        return 'http://openweathermap.org/img/wn/09d@4x.png'
    }else if(id >= 500 && id <= 531) {
        return 'http://openweathermap.org/img/wn/10d@4x.png'
    }else if(id >= 600 && id <= 622) {
        return 'http://openweathermap.org/img/wn/13d@4x.png'
    }else if(id >= 701 && id <= 781) {
        return 'http://openweathermap.org/img/wn/50d@4x.png'
    }else if(id === 800) {
        return 'http://openweathermap.org/img/wn/01d@4x.png'
    }else if(id >= 801 && id <= 804) {
        return 'http://openweathermap.org/img/wn/02d@4x.png'
    }
}

function setMarkup(weatherData) {
    const{ main: {temp, humidity, feels_like: feelsLike} } = weatherData;
    const { wind: {speed} } = weatherData;
    const { name } = weatherData;

    return `<h2 class="location">${name}</h2>
            <div class="weather-icon">
                <img src=${getWeatherIcon(weatherData)} alt="">
            </div>
            <div class="temperature">${Math.round(temp)}&deg;C</div>
            <div class="feels-like">Ощущается на ${Math.round(feelsLike)}&deg;C</div>
            <div class="humidity">Влажность: ${humidity}&#37;</div>
            <div class="wind-speed">Скорость ветра: ${speed.toFixed(1)} М/с</div>`
}

function renderMarkup(weatherData) {
    weatherDetails.innerHTML = setMarkup(weatherData)
}