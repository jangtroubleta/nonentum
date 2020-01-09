const clockContainer = document.querySelector(".clock");
const clockTitle = clockContainer.querySelector("h1");
const greetingContainer = document.querySelector(".greeting");
//const greetingTitle = greetingContainer.querySelector("h2");

function getTime() {
    const now = new Date();
    const hour = now.getHours(), minutes = now.getMinutes(), second = now.getSeconds();
    
    clockTitle.innerHTML = (hour < 10) ? `0${hour}` : `${hour}`;
    clockTitle.innerHTML += (minutes < 10) ? `:0${minutes}` : `:${minutes}`;
    clockTitle.innerHTML += (second < 10) ? `:0${second}` : `:${second}`;
}

function setGreeting() {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder","What is your name");
    form.appendChild(input);
    greetingContainer.appendChild(form);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert(input.value);
    });
}

/* function getGreeting() {
    const now = new Date();
    const hour = now.getHours();  
    let greeting = "";

    if(hour >= 5 && hour < 12) {
        greeting = "Good morning!,";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon!,";
    } else {
        greeting = "Good evening!,";
    }

    greetingTitle.innerHTML = `${greeting} JangTroubleTa.`;
} */

function init() {
    getTime();

    if(localStorage.getItem("name") !== null) {
        getGreeting()
    } else {
        setGreeting() 
    }
}

init();
setInterval(getTime, 1000);
if(localStorage.getItem("name") !== null) {
    setInterval(getGreeting, 1000*60*60);
}