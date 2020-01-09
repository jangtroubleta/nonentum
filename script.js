const clockContainer = document.querySelector(".clock");
const clockTitle = clockContainer.querySelector("h1");
const messageContainer = document.querySelector(".message");
const messageTitle = messageContainer.querySelector("h2");

function getTime() {
    const now = new Date();
    const hour = now.getHours(), minutes = now.getMinutes(), second = now.getSeconds();
    
    clockTitle.innerHTML = (hour < 10) ? `0${hour}` : `${hour}`;
    clockTitle.innerHTML += (minutes < 10) ? `:0${minutes}` : `:${minutes}`;
    clockTitle.innerHTML += (second < 10) ? `:0${second}` : `:${second}`;
}

function getMessage() {
    const now = new Date();
    const hour = now.getHours();  
    let message = "";

    if(hour >= 5 && hour < 12) {
        message = "Good morning!,";
    } else if (hour >= 12 && hour < 17) {
        message = "Good afternoon!,";
    } else {
        message = "Good evening!,";
    }

    messageTitle.innerHTML = `${message} JangTroubleTa.`;
}

function init() {
    getTime();
    getMessage();
}

init();
setInterval(getTime, 1000);
setInterval(getMessage, 1000*60*60);