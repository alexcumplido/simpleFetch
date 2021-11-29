let header = { headers: { Accept: 'application/json' }};
let joke;
let reportJokes =[];

let btnJokes = document.querySelector('#jokes');
let btnScore = document.querySelectorAll('#score button')
let templateJoke = document.querySelector('p');
let templateWeather = document.querySelector('span')
let iconWeather = document.querySelector('img');

btnJokes.addEventListener ('click', () => {
    fetch('https://icanhazdadjoke.com/', header)
        .then(response => response.json())
        .then(response => {
            joke = response.joke;
            templateJoke.textContent = `${joke}`;
        })
        .catch(error => templateJoke.textContent = error);
})

// Prevent double score for same joke
btnScore.forEach( button => {
    button.addEventListener ('click', event => {
        registerJoke(event);
    })
})

function registerJoke (event) {
    reportJokes.push({
        jokeText: joke,
        score: Number(this.event.target.id), 
        date: new Date().toISOString(),
    });
}

let privateKey = '3a6de1bfb15f6d47dc749e2fc2555d25';

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&APPID=${privateKey}`)
    .then(response => response.json())
    .then(response => {
        iconWeather.setAttribute('src',`http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
        templateWeather.textContent = ` ${response.name} ${response.main.temp} celsius`;
    });