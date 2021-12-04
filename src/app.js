"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_WEATHER_K = '3a6de1bfb15f6d47dc749e2fc2555d25';
const API_DAD = 'https://icanhazdadjoke.com/';
const API_CHUCK = 'https://api.chucknorris.io/jokes/random';
let jokeFetched;
let reportJokes = [];
let lat;
let long;
let weatherHtml = document.querySelector('span');
let weatherIcon = document.querySelector('img');
let buttons = document.querySelectorAll('button');
let btnScore = document.querySelectorAll('#score button');
let templateJoke = document.querySelector('p');
let shapeBackground = document.querySelector('section#joke > div');
navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    fetchWeather(lat, long)
        .then(response => displayWeather(response));
});
function fetchWeather(lat, long) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_WEATHER_K}`);
        return yield res.json();
    });
}
function displayWeather(response) {
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
    weatherHtml.textContent = `${response.main.temp} °C`;
}
function fetchIcanhaz() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_DAD}`, { headers: { Accept: 'application/json' } });
        return jokeFetched = yield res.json();
    });
}
function fetchCuck() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_CHUCK}`);
        return jokeFetched = yield res.json();
    });
}
function insertHTML(content) {
    templateJoke.textContent = content;
}
function replaceShape() {
    switch (Math.floor(Math.random() * 3 + 1)) {
        case 1:
            shapeBackground.classList.remove("shape2", "shape3");
            shapeBackground.classList.add('shape1');
            break;
        case 2:
            shapeBackground.classList.remove("shape1", "shape3");
            shapeBackground.classList.add('shape2');
            break;
        case 3:
            shapeBackground.classList.remove("shape1", "shape2");
            shapeBackground.classList.add('shape3');
            break;
    }
}
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if ((Math.floor(Math.random() * 2 + 1) > 1)) {
            fetchIcanhaz()
                .then(res => insertHTML(res.joke))
                .catch(error => insertHTML(error));
            replaceShape();
        }
        else {
            fetchCuck()
                .then(res => insertHTML(res.value))
                .catch(error => insertHTML(error));
            replaceShape();
        }
    });
});
btnScore.forEach(button => {
    button.addEventListener('click', () => {
        reportJokes.push({
            jokeText: jokeFetched.joke || jokeFetched.value,
            id: jokeFetched.id,
            score: parseInt(button.id),
            date: new Date().toISOString(),
        });
    });
});
