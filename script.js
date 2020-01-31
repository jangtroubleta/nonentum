const clockContainer = document.querySelector(".clock");
const clockTitle = clockContainer.querySelector("h1");
const greetingContainer = document.querySelector(".greeting");
const focusContainer = document.querySelector(".focus");
const weatherContainer = document.querySelector(".weather");
const weatItem1 = weatherContainer.querySelector(".weatItem1");
const weatItem2 = weatherContainer.querySelector(".weatItem2");
const links = document.querySelector(".links");
const overlay = document.querySelector(".modal_overlay");
const modal = document.querySelector(".links_modal");

const CURRENTUSER = "currentUser";
const CURRENTFOCUS = "currentFocus";
const COORDS = "coords";
const LINETHROUGH_CLASS = "line-through";
const API_KEY = "c0d27ef77a61066e45d69cb95de884af";
const HEDDEN_CLASS = "hidden";

function getTime() {
    const now = new Date();
    const hour = now.getHours(), minutes = now.getMinutes(), second = now.getSeconds();
    
    clockTitle.innerHTML = (hour < 10) ? `0${hour}` : `${hour}`;
    clockTitle.innerHTML += (minutes < 10) ? `:0${minutes}` : `:${minutes}`;
    clockTitle.innerHTML += (second < 10) ? `:0${second}` : `:${second}`;
}

function setGreeting(user = null) {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder","What is your name?");
    input.value = user;
    localStorage.removeItem(CURRENTUSER);
    form.appendChild(input);
    greetingContainer.appendChild(form);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem(CURRENTUSER, input.value.trim());
        greetingContainer.removeChild(form);
        getGreeting();
    });
}

function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const h2 = document.createElement("h2");
    const button = document.createElement("button");
    
    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning!,";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon!,";
    } else {
        greeting = "Good evening!,";
    }

    h2.innerHTML = `${greeting} ${localStorage.getItem(CURRENTUSER)}.`;
    greetingContainer.appendChild(h2);
    button.innerHTML = "edit";
    h2.appendChild(button);

    button.addEventListener("click", () => {
        greetingContainer.removeChild(h2);
        setGreeting(localStorage.getItem(CURRENTUSER));
    });
}

function setFocus() {
    const form = document.createElement("form");
    const h3 = document.createElement("h3")
    const input = document.createElement("input");
   
    focusContainer.appendChild(form);
    
    input.setAttribute("type", "text");
    input.setAttribute("placeholder","Your focus!");
    h3.innerHTML = "What is your main focus for today?";
    
    form.appendChild(h3);
    form.appendChild(input);
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem(CURRENTFOCUS, input.value.trim());
        focusContainer.removeChild(form);
        getFocus();
    });
}

function getFocus() {
    const h3 = document.createElement("h3");
    const button = document.createElement("button");
    const input = document.createElement("input");

    input.setAttribute("type", "checkbox");
    h3.innerHTML = localStorage.getItem(CURRENTFOCUS);
    button.innerHTML = "X";

    focusContainer.appendChild(input);
    focusContainer.appendChild(h3);
    focusContainer.appendChild(button);

    input.addEventListener("click", () => {
        h3.classList.toggle(LINETHROUGH_CLASS);
    });

    button.addEventListener("click", () => {
        focusContainer.removeChild(input);
        focusContainer.removeChild(button);
        focusContainer.removeChild(h3);
        localStorage.removeItem(CURRENTFOCUS);
        setFocus();
    });
}

function handleGeoSucces(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        // console.log(json);
        const img = document.createElement("img");
        let span = document.createElement("span");
        let td = document.createElement("td");

        img.setAttribute("src", `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`);
        span.innerHTML = `${Math.round(json.main.temp)} &ordm;C`;
        
        td.appendChild(img)
        weatItem1.appendChild(td);
        td = document.createElement("td");
        td.appendChild(span);
        weatItem1.appendChild(td);

        span = document.createElement("span");
        span.innerHTML = json.name;

        td = document.createElement("td");
        td.setAttribute("colspan", "2");
        td.appendChild(span);
        weatItem2.appendChild(td);
    });
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        // console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

links.addEventListener("click", () => {
    modal.classList.toggle(HEDDEN_CLASS);
});

overlay.addEventListener("click", () => {
    modal.classList.toggle(HEDDEN_CLASS);
});

function init() {
    getTime();
    loadCoords();
    ( localStorage.getItem(CURRENTUSER) ) !== null ? getGreeting() : setGreeting();
    ( localStorage.getItem(CURRENTFOCUS)) !== null ? getFocus() : setFocus();
}

init();
setInterval(getTime, 1000);
if (localStorage.getItem(CURRENTUSER) !== null) {
    setInterval(getGreeting, 1000*60*60);
}