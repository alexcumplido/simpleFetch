const API_WEATHER: String = 'http://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&APPID=';
const API_WEATHER_KEY: String = '3a6de1bfb15f6d47dc749e2fc2555d25';
const API_DAD: String = 'https://icanhazdadjoke.com/';
const API_CHUCK: String = 'https://api.chucknorris.io/jokes/random';

let jokeFetched: any;
let reportJokes = [];
let btnJokes: HTMLElement | any = document.querySelector('#jokes');
let btnScore: NodeListOf<Element> = document.querySelectorAll('#score button')
let templateJoke: HTMLElement | any = document.querySelector('p');
let weatherHtml: HTMLElement | any = document.querySelector('span')
let weatherIcon: HTMLElement | any = document.querySelector('img');


fetchWeather().    
    then(res => {
    weatherIcon.setAttribute('src',`http://openweathermap.org/img/w/${res.weather[0].icon}.png`);
    weatherHtml.textContent = `${res.name} ${res.main.temp} °C`;
});

async function fetchWeather () {
    let res = await fetch(`${API_WEATHER}${API_WEATHER_KEY}`);
    return await res.json();
}

btnJokes.addEventListener ('click', () => {
    if ((Math.floor(Math.random()*2+1)>1)){
        fetchIcanhaz()
            .then(res => insertHTML(res.joke))
            .catch(error => insertHTML(error));
    }else {
        fetchCuck()
            .then(res => insertHTML(res.value))
            .catch(error => insertHTML(error));
    }
})

async function fetchIcanhaz() {
    const res = await fetch(`${API_DAD}`, {headers:{Accept:'application/json'}});
    return jokeFetched = await res.json();
}

async function fetchCuck() {
    const res = await fetch(`${API_CHUCK}`);
    return jokeFetched = await res.json();
}

function insertHTML (content: any) {
    templateJoke.textContent =  content;
}

// Prevent double score for same joke
btnScore.forEach( button => {
    button.addEventListener ('click', event => {
        registerJoke(jokeFetched, event);
    })
})

function registerJoke (jokeFetched: any, event: any) {
    reportJokes.push({
        jokeText: jokeFetched.joke || jokeFetched.value,
        id: jokeFetched.id,
        score: Number(event.target.id), 
        date: new Date().toISOString(),
    });
}