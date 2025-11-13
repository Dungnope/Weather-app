import { seachIcon , locationInput, timeCategory, boxContainer, titleSection, forecastSection, detailSection, loading} from "./components.js";
import CloudyIcon from './icon/cloudy.svg';
import ClearIcon from './icon/clear.svg';
import DrizzleIcon from './icon/Drizzle.svg';
import RainIcon from './icon/rain.svg';
import SnowyIcon from './icon/snowy.svg';
import SunIcon from './icon/Sun.svg';
import ThunderIcon from './icon/thunder.svg';
const getdata = async (location) => {
    const APIkey = `f3cb28dff5f1dd2816a571f85f82574c`;
    try {
        const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location.trim()}&appid=${APIkey}`);
        const data = await rawData.json();
        return new Promise((resolve, reject) => {
            if(rawData.ok){
                setTimeout(() => {
                    resolve(data);
                }, 100);
            }
            else{
                reject("");
            }
        })

    } catch (error) {
        return undefined;
    }
    
}

const resolveData = (data) => {
        //location
    const currentCountry = new Intl.DisplayNames(["en"], { type: "region" }).of(data.sys.country);
    const currentLocation = data.name;

    const location = {
        country: currentCountry,
        location: currentLocation
    }
    
    //date
    const currentTime = Date.now()  + 1000 * data.timezone;
    const currentDay = new Date(currentTime).toDateString().split(" ")[0];
    const currentMonth = new Date(currentTime).toDateString().split(" ")[1];
    const currentDate = new Date(currentTime).toDateString().split(" ")[2];

    const time = {
        day: currentDay,
        month: currentMonth,
        date: currentDate
    }

    //forecast section
    const currentTemperature = Math.round(data.main.temp - 273.15);
    let iconWeather = {
        link: ''
    }
    weatherConditionIcon(data.weather[0].main, iconWeather);

    const temperature = {
        weathericon: iconWeather,
        degree: currentTemperature,
        mainweather: data.weather[0].main
    }

    //detail
    const humidity = data.main.humidity;
    const windspeed = data.wind.speed;
    const pressure = data.main.pressure;
    
    const detail = {
        humidity: humidity,
        wind: windspeed,
        pressure: pressure
    }

    return {location, time, temperature, detail}
}

const weatherConditionIcon = (condition, iconWeather) => {
    switch (condition) {
        case 'Thunderstorm':
            iconWeather.link =ThunderIcon;
            break;
        case 'Drizzle':
            iconWeather.link = DrizzleIcon;
            break;
        case 'Rain':
            iconWeather.link = RainIcon;
            break;
        case 'Snow':
            iconWeather.link = SnowyIcon;
            break;
        case 'Atmostphere':
            iconWeather.link = SunIcon;
            break;
        case 'Clouds':
            iconWeather.link = CloudyIcon;
            break;
        default:
            iconWeather.link = ClearIcon;
            break;
    }
}

// see tomorrow today next 7 days forecast
const timeInteractive = () => {timeCategory.forEach((time, idx) => {
    time.addEventListener("click", (e) => {
        for(let i = 0; i < timeCategory.length; i++){
            if(timeCategory[i].classList.contains("hightlight_date")){
                timeCategory[i].classList.remove("hightlight_date");
            }
        }
        e.currentTarget.classList.add("hightlight_date");
    })
})}

//display data
const loadingAnimation = (content_box) => {
    content_box.innerHTML = "";
    content_box.innerHTML += loading;
}

const renderInfo = (retrievedata) => {
    boxContainer.innerHTML = "";
    const showError = document.querySelector(".error_location");
    if(retrievedata)
    {
        showError.removeAttribute("style");
        const locate = titleSection(retrievedata.location, retrievedata.time);
        const forecast = forecastSection(retrievedata.temperature);
        const detail = detailSection(retrievedata.detail);

        boxContainer.innerHTML = "";
        boxContainer.innerHTML = locate + forecast + detail;
    }
    else{
        showError.style.display = "block";
        loadingAnimation(boxContainer);
    }

}

//search interactive
const searchInteractive = () => {
    seachIcon.addEventListener("click", async (e) => {
        if(locationInput.value !== ""){
            try{
                loadingAnimation(boxContainer);    
                const datablock = await getdata(locationInput.value);
                renderInfo(resolveData(datablock));
                e.target.value = "";
            }
            catch{
                renderInfo(undefined);
            }
        }
    })
}

const findLocationInteractive = () => {
    locationInput.addEventListener("keydown", async (e) => {
        if(e.key == "Enter" && e.target.value !== ""){
            try{
                loadingAnimation(boxContainer);
                const datablock = await getdata(locationInput.value);
                renderInfo(resolveData(datablock));
                e.target.value = "";
            }
            catch{
                renderInfo(undefined);
            }
        }
    })
}

const switchTheme = () => {
    const theme = document.querySelector("body");
    const switchBtn = document.querySelector(".switch-mode");
    switchBtn.addEventListener("click", e => {
        if(!theme.classList.contains("dark")){
            switchBtn.textContent = "🌜";
            theme.classList.toggle("dark");
        }
        else{
            switchBtn.textContent = "🌞";
            theme.classList.toggle("dark");
        }
    })
}

export {timeInteractive, searchInteractive, findLocationInteractive, renderInfo, getdata, resolveData, switchTheme}
