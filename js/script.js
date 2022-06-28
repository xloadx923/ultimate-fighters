const heroes = [];
const fighters = [];
const universe = [];

async function waitingForResponse() {
    const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
    const todoList = await response.json();

    displayHeroes(todoList);
}

waitingForResponse();