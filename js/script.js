
const heroes = [];

async function waitingForResponse() {
    const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
    const todoList = await response.json();

    displayHeroes(todoList);
}

function getRandomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function changeFighter(){

    document.getElementById('fighter1').addEventListener('change',function(){
        if(this.checked) document.getElementById('fighter2').checked = false;
    });
    document.getElementById('fighter2').addEventListener('change',function(){
        if(this.checked) document.getElementById('fighter1').checked = false;
    });

}

function closeDetails(){
    document.querySelector('.allDetails').addEventListener('click',function(event){ this.classList.toggle('display'); })
}

function displayFighter(fighter,hero){
    document.querySelector(fighter).firstElementChild.innerText = hero.name;
    document.querySelector(fighter).style= `background: url(${hero.images.lg}) no-repeat;background-size: contain;`;
    document.querySelector(fighter).addEventListener('click',function(){ document.querySelector('.allDetails').classList.toggle('display'); });
    displayStats('.textDetails',hero);
}

function displayStats(nameDetail,hero){
    document.querySelector(nameDetail).innerHTML = '';
    const stats = document.createElement('div');
    stats.innerHTML += (nameDetail=='textDetails') ? '<i class="fa fa-times fa-2x fa-fw crossClose"></i>' : '';
    stats.innerHTML += `<p>Life :${hero.powerstats.life}</p>`;
    stats.innerHTML += `<p>Shield :${hero.powerstats.shield}</p>`;
    stats.innerHTML += `<p>Intelligence :${hero.powerstats.intelligence}</p>`;
    stats.innerHTML += `<p>Strength :${hero.powerstats.strength}</p>`;
    stats.innerHTML += `<p>Durability :${hero.powerstats.durability}</p>`;
    stats.innerHTML += `<p>Power :${hero.powerstats.power}</p>`;
    stats.innerHTML += `<p>Combat :${hero.powerstats.combat}</p>`;
    document.querySelector(nameDetail).appendChild(stats);
}

function displayHeroes(todoList){
    todoList.forEach(hero => {
        // console.log(hero)
        hero.powerstats.life = 100;
        hero.powerstats.shield = getRandomNumber(10,30);
        heroes.push(hero);
    });
    heroes.forEach(hero => {
        const heroDetail = document.createElement("button");
        heroDetail.classList.add('choiceHero');
        heroDetail.id = hero.id;
        const image = document.createElement("img");
        image.src= hero.images.lg;
        image.alt = image.title = hero.name;
        heroDetail.append(image);
        document.querySelector('.heroes').appendChild(heroDetail);

        changeFighter();
        closeDetails();

        heroDetail.addEventListener('click',function(event){
            if(document.getElementById('fighter1').checked){
                displayFighter('.firstFighter',hero);
                displayStats('.combatScene1',hero);
            }
            if(document.getElementById('fighter2').checked){
                displayFighter('.secondFighter',hero);
                displayStats('.combatScene2',hero);
            }

            console.log(hero.name)
        });

    });
}
// console.log(heroes)

waitingForResponse();