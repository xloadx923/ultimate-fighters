const heroes = [];

async function waitingForResponse() {
    const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
    const todoList = await response.json();
    // return todoList;
    todoList.forEach(hero => {
        localStorage.setItem(hero.id,hero)
    });
    // console.log(todoList[0]['name'],todoList[0]['appearance']['eyeColor']);
}

waitingForResponse();
