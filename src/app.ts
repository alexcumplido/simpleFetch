const API_WEATHER_K: string = '3a6de1bfb15f6d47dc749e2fc2555d25';
const API_DAD: string = 'https://icanhazdadjoke.com/';
const API_CHUCK: string = 'https://api.chucknorris.io/jokes/random';

let jokeFetched: Promise<Object> | any;
let reportJokes: any[] = [];
let lat: number;
let long: number;
let weatherHtml: HTMLElement | any = document.querySelector('span')
let weatherIcon: HTMLElement | any = document.querySelector('img');
let buttons: NodeListOf<Element> = document.querySelectorAll('button');
let scorePanel : HTMLElement | any = document.querySelector('#score');
let btnScore: NodeListOf<Element> = document.querySelectorAll('#score button')
let templateJoke: HTMLElement | any = document.querySelector('p');
let shapeBackground : HTMLElement | any = document.querySelector('#joke > div');

navigator.geolocation.getCurrentPosition((position)=> {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    fetchWeather(lat, long)
        .then(response => displayWeather(response))
});

async function fetchWeather (lat: number, long: number) {
    const res = await fetch
    (`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_WEATHER_K}`);
    return await res.json();
}

function displayWeather (response: any): void {
    weatherIcon.setAttribute('src',`http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
    weatherHtml.textContent = `${response.main.temp} °C`;
}

async function fetchIcanhaz() {
    const res = await fetch(`${API_DAD}`, {headers:{Accept:'application/json'}});
    return jokeFetched = await res.json();
}

async function fetchCuck() {
    const res = await fetch(`${API_CHUCK}`);
    return jokeFetched = await res.json();
}

function insertHTML (content: string): void {
    templateJoke.textContent = content;
}

function showScoreButtons(): void {
    scorePanel.style.display = 'block';
}

function replaceShape(): void {
    switch (Math.floor(Math.random()*3+1)){
        case 1:
            shapeBackground.classList.remove("shape2","shape3");
            shapeBackground.classList.add('shape1');
            break;
        case 2:
            shapeBackground.classList.remove("shape1","shape3");
            shapeBackground.classList.add('shape2');
            break;
        case 3: 
            shapeBackground.classList.remove("shape1","shape2");
            shapeBackground.classList.add('shape3');
            break;
    }
}

buttons.forEach((button) => {
    button.addEventListener ('click', () => {
        if ((Math.floor(Math.random()*2+1)>1)){
            fetchIcanhaz()
                .then(res => insertHTML(res.joke))
                .catch(error => insertHTML(error));
            replaceShape();
            showScoreButtons()
                
        }else{
            fetchCuck()
                .then(res => insertHTML(res.value))
                .catch(error => insertHTML(error));
            replaceShape();
            showScoreButtons();
        }
    });
});

btnScore.forEach( button => {
    button.addEventListener ('click', () => {
        reportJokes.push({
            jokeText: jokeFetched.joke || jokeFetched.value,
            id: jokeFetched.id,
            score: parseInt(button.id), 
            date: new Date().toISOString(),
        });
    })
});
