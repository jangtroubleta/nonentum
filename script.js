const clockContainer = document.querySelector(".clock");
const clockTitle = clockContainer.querySelector("h1");
const greetingContainer = document.querySelector(".greeting");

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
        localStorage.setItem("currentUser", input.value.trim());
        greetingContainer.removeChild(form);
        getGreeting();
    });
}

function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const h3 = document.createElement("h3");
    const button = document.createElement("button");
    let greeting = "";

    if(hour >= 5 && hour < 12) {
        greeting = "Good morning!,";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon!,";
    } else {
        greeting = "Good evening!,";
    }

    h3.innerHTML = `${greeting} ${localStorage.getItem("currentUser")}.`;
    greetingContainer.appendChild(h3);
    button.innerHTML = "edit";
    h3.appendChild(button);

    button.addEventListener("click", () => {
        greetingContainer.removeChild(h3);
        localStorage.removeItem("currentUser");
        setGreeting();
    });
}

function init() {
    getTime();

    if(localStorage.getItem("currentUser") !== null) {
        getGreeting()
    } else {
        setGreeting() 
    }
}

init();
setInterval(getTime, 1000);
if(localStorage.getItem("currentUser") !== null) {
    setInterval(getGreeting, 1000*60*60);
}