
const heroes = [];
async function waitingForResponse() {
    const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
    const todoList = await response.json();

    displayHeroes(todoList);
}
function displayFighter(fighter,hero){
    document.querySelector(fighter).style= `background: url(${hero.images.lg})no-repeat;background-size: contain;`;
}
function displayStats(nameDetail,hero){

    document.querySelector(nameDetail).innerText = "";
    const stats = document.createElement('div');
    stats.innerHTML = hero.powerstats.speed;
    document.querySelector(nameDetail).appendChild(stats);
}

function displayHeroes(todoList){
    // console.log(todoList[0]['name'],todoList[0]['appearance']['eyeColor']);
    todoList.forEach(hero => {
        // console.log(hero)
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

        heroDetail.addEventListener('click',function(event){
            if(document.getElementById('fighter1').checked){
                displayFighter('.fighter1',hero);
                displayStats('.statsDetail1',hero);
            }
            if(document.getElementById('fighter2').checked){
                displayFighter('.fighter2',hero);
                displayStats('.statsDetail2',hero);
            }

            console.log(hero.name)
        });

    });
}
// console.log(heroes)
waitingForResponse();
function changeFighter(){

    document.querySelector('.firstFighter').addEventListener('change',function(){
        if(this.checked) document.getElementById('fighter2').checked = false;
    });
    document.querySelector('.secondFighter').addEventListener('change',function(){
        if(this.checked) document.getElementById('fighter1').checked = false;
    });

}
