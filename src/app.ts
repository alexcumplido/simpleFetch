const API_DAD: string = 'https://icanhazdadjoke.com/';
const API_CHUCK: string = 'https://api.chucknorris.io/jokes/random';
let jokeFetched: Promise<Object> | any;

type joke = {
    id: number,
    jokeText: string,
    score: number,
    date: string,
}

let reportJokes: joke [] = [];
let templateJoke: HTMLParagraphElement = document.querySelector('p')!;
let weatherHtml: HTMLSpanElement = document.querySelector('span')!;
let weatherIcon: HTMLImageElement = document.querySelector('img')!;
let shapeBackground: HTMLDivElement= document.querySelector('#joke > div')!;
let scorePanel = document.querySelector('#score') as HTMLDivElement; 
let buttons: NodeListOf<Element> = document.querySelectorAll('button');
let btnScore: NodeListOf<Element> = document.querySelectorAll('#score button');

async function fetchWeather (lat: number, long: number) {
    const res = await fetch
    (`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${'3a6de1bfb15f6d47dc749e2fc2555d25'}`);
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

navigator.geolocation.getCurrentPosition((position)=> {
    let lat: number = position.coords.latitude;
    let long: number = position.coords.longitude;
    fetchWeather(lat, long)
        .then(response => displayWeather(response));
});

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
    button.addEventListener ('click', (evt: Event) => {
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
    button.addEventListener ('click', (evt: Event) => {
        reportJokes.push({
            id: jokeFetched.id,
            jokeText: jokeFetched.joke || jokeFetched.value,
            score: parseInt(button.id), 
            date: new Date().toISOString(),
        });
    })
});
