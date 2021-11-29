

let header = { headers: { Accept: 'application/json' }};
let joke;
let reportJokes =[];

let btnJokes = document.querySelector('#jokes');
let btnScore = document.querySelectorAll('#score button')
let jokeTemplate = document.querySelector('p');


btnJokes.addEventListener ('click', () => {
    fetch('https://icanhazdadjoke.com/', header)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            joke = response.joke;
            jokeTemplate.textContent = `${joke}`;
        })
        .catch(error => console.log(error));
})

btnScore.forEach( (button) => {
    button.addEventListener ('click', (event) => {
        reportJokes.push({
            jokeText: joke,
            score: Number(event.target.id),
            date: new Date().toISOString(),
        });
    })
})
