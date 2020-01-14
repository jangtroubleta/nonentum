const clockContainer = document.querySelector(".clock");
const clockTitle = clockContainer.querySelector("h1");
const greetingContainer = document.querySelector(".greeting");
const focusContainer = document.querySelector(".focus");

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
    localStorage.removeItem("currentUser");
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

    h2.innerHTML = `${greeting} ${localStorage.getItem("currentUser")}.`;
    greetingContainer.appendChild(h2);
    button.innerHTML = "edit";
    h2.appendChild(button);

    button.addEventListener("click", () => {
        greetingContainer.removeChild(h2);
        setGreeting(localStorage.getItem("currentUser"));
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
        localStorage.setItem("currentFocus", input.value.trim());
        focusContainer.removeChild(form);
        getFocus();
    });
}

function getFocus() {
    const h3 = document.createElement("h3");
    const button = document.createElement("button");
    const input = document.createElement("input");

    input.setAttribute("type", "checkbox");
    h3.innerHTML = localStorage.getItem("currentFocus");
    button.innerHTML = "X";

    focusContainer.appendChild(input);
    focusContainer.appendChild(h3);
    focusContainer.appendChild(button);

    input.addEventListener("click", () => {
        (input.checked) ?  h3.classList.toggle("line-through") : h3.classList.toggle("line-through");
    });

    button.addEventListener("click", () => {
        focusContainer.removeChild(input);
        focusContainer.removeChild(button);
        focusContainer.removeChild(h3);
        localStorage.removeItem("currentFocus");
        setFocus();
    });
}

function init() {
    getTime();
    ( localStorage.getItem("currentUser") ) !== null ? getGreeting() : setGreeting();
    ( localStorage.getItem("currentFocus")) !== null ? getFocus() : setFocus();
}

init();
setInterval(getTime, 1000);
if (localStorage.getItem("currentUser") !== null) {
    setInterval(getGreeting, 1000*60*60);
}