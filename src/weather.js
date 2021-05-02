const weather = document.querySelector(".js-weather"),
    temp = document.querySelector(".js-temp"),
    icon = document.querySelector(".js-icon");

const API_KEY = "7a4dd76ce7332e706abb7675ee32c2fd";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json(); 
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${place}`;
        temp.innerText=`${temperature}°C`;
        const iconImg = document.createElement("img");
        const iconCode = `icon/${json.weather[0].icon}.png`;     
        iconImg.setAttribute("src", iconCode);
        iconImg.setAttribute("class", "js-iconImg");
        icon.appendChild(iconImg);
    });
}

function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError()
{
    console.log("Cant access geo location");
}

function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords()
{
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null)
    {
        askForCoords();
    }
    else
    {
        // getWeather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init()
{
    loadCoords();
}

init();