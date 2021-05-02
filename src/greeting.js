const form = document.querySelector(".js-form"),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text)
{
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName()
{
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text)
{
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    const date = new Date();
    const hoursCheck = date.getHours();
    if(hoursCheck >= 6 && hoursCheck < 12)
    {
        greeting.innerText = `Good Morning, ${text}`;
    }
    else if(hoursCheck >= 12 && hoursCheck < 18)
    {
        greeting.innerText = `Good Afternoon, ${text}`;
    }
    else if(hoursCheck >= 18 && hoursCheck < 24)
    {
        greeting.innerText = `Good Evening, ${text}`;
    }
    else if(hoursCheck >= 0 && hoursCheck < 6)
    {
        greeting.innerText = `Good Night, ${text}`;
    }
}

function loadName()
{
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null)
    {
        askForName();
    }
    else
    {
        paintGreeting(currentUser);
    }
}

function init()
{
    loadName();
}

init();