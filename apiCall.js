
// Read api documentation
// Test api in Postman
// Create title and button as tamplate
// Fetch API Joke 
// Display API response in console
// Attach event to button so onclick fetch api again

// 

const btn = document.querySelector('button');
let jokeTemplate = document.querySelector('p');
let joke;

btn.addEventListener ('click', () => {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            Accept: 'application/json',
        }
    })
        .then(response => response.json())
        .then(response => joke = response.joke)
        .catch(error => console.log(error));

        jokeTemplate.textContent = `${joke}`;
})




