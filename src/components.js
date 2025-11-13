const boxContainer = document.querySelector(".container_main");
const seachIcon = document.querySelector(".search_icon");
const timeCategory = document.querySelectorAll(".container_phone-day");
const locationInput = document.querySelector("#find_city");

const titleSection = (position, time) => {
    if(position.location === "Turan")
    {
        position.location = "Da Nang"
    }
return `
    <section class="container_phone-title">
        <div class="container_phone-city ">${position.location},<br> ${position.country}</div>
        <div class="container_phone-time ">${time.day}, ${time.month} ${time.date}</div>
    </section>
`
}

const forecastSection = (temperature) => {
return `
    <section class="container_phone-forecast">
        <img src="${temperature.weathericon.link}" alt="weathericon" class="weather_icon" title = "${temperature.mainweather}">
        <div class="container_phone-condition">
            <h2>
                <span>${temperature.degree} <sup>° C</sup></span>
                <span>${temperature.mainweather}</span>
            </h2>
        </div>
    </section>
`
}

const detailSection = (info) => {
return `
    <ul class="container_phone-detail">
        <li>
            <div class="container_phone-icon">
                <span><i class="fa-solid fa-droplet"></i></span>
                <span class="icon-name">Humidity</span>
                <span>${info.humidity}%</span>
            </div>
        </li>
        <li>
            <div class="container_phone-icon">
                <span><i class="fa-solid fa-wind"></i></span>
                <span class="icon-name">Wind</span>
                <span>${info.wind} km/h</span>
            </div>
        </li>
        <li>
            <div class="container_phone-icon">
                <span><i class="fa-solid fa-sun"></i></span>
                <span class="icon-name">Pressure</span>
                <span>${info.pressure} hPa</span>
            </div>
        </li>
    </ul>
`
}

const loading = `<span class="loader"></span>`;

export {seachIcon, timeCategory, locationInput, boxContainer, loading, titleSection, forecastSection, detailSection};