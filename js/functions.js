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
    document.querySelector('.allDetails').addEventListener('click',function(){ this.classList.toggle('display'); })
}

function displayFighter(fighter,hero){
    document.querySelector(fighter).firstElementChild.innerText = hero.name;
    document.querySelector(fighter).style= `background: url(${hero.images.lg}) no-repeat;background-size: contain;`;
    // EventListener on list of fighters
    document.querySelector(fighter).addEventListener('click',function(){
        document.querySelector('.allDetails').classList.toggle('display');
        displayStats('.textDetails',hero);
    });
}
/*************** Without Duplicate ******************/
function findDuplicates(arr) {
    const filtered = arr.filter((item, index) => arr.indexOf(item) !== index);
    return [...new Set(filtered)]
}
/*************** Display universe without duplicate *********************/
function displayUniverse(){
    const duplicates = findDuplicates(universe);
    duplicates.sort();
    duplicates.forEach((item) => {
        const option = document.createElement('option');
        option.setAttribute('value',item);
        option.innerText = item;
        document.querySelector('#universe').append(option);
    });
}
/*************** Display stats *********************/
function displayStats(nameDetail,hero){
    const stats = document.querySelector(nameDetail);
    stats.innerHTML = '';
    stats.innerHTML += (nameDetail=='textDetails') ? '<i class="fa fa-times fa-2x fa-fw crossClose"></i>' : '';
    stats.innerHTML += `<div class="entitledStat">Combat</div><div class="valueStat">${hero.powerstats.combat}</div>`;
    stats.innerHTML += `<div class="entitledStat">Durability</div><div class="valueStat">${hero.powerstats.durability}</div>`;
    stats.innerHTML += `<div class="entitledStat">Intelligence</div><div class="valueStat">${hero.powerstats.intelligence}</div>`;
    stats.innerHTML += `<div class="entitledStat">Life</div><div class="valueStat">${hero.powerstats.life}</div>`;
    stats.innerHTML += `<div class="entitledStat">Power</div><div class="valueStat">${hero.powerstats.power}</div>`;
    stats.innerHTML += `<div class="entitledStat">Shield</div><div class="valueStat">${hero.powerstats.speed}</div>`;
    stats.innerHTML += `<div class="entitledStat">Shield</div><div class="valueStat">${hero.powerstats.shield}</div>`;
    stats.innerHTML += `<div class="entitledStat">Strength</div><div class="valueStat">${hero.powerstats.strength}</div>`;
    stats.innerHTML += `<div class="entitledStat">Combat</div><div class="valueStat">${hero.powerstats.weapon}</div>`;
}
/*************** Display heroes *********************/
function displayHeroes(todoList){
    todoList.forEach(hero => {
        // console.log(hero)
        hero.powerstats.life = 1500;
        hero.powerstats.shield = getRandomNumber(10,20);
        hero.powerstats.weapon = getRandomNumber(10,20);

        const result = (hero.biography.publisher === null) ? 'Unknown universe' : hero.biography.publisher.trim();
        universe.push(result); // Traitement des univers inconnus

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

        let buttonBefore1 = undefined, buttonBefore2 = undefined;

        heroDetail.addEventListener('click',function(event){

            if(document.getElementById('fighter1').checked){

                displayFighter('.firstFighter',hero);
                displayStats('.combatScene1',hero);

                localStorage.setItem('attacker', hero.id);

            }
            if(document.getElementById('fighter2').checked){

                displayFighter('.secondFighter',hero);
                displayStats('.combatScene2',hero);

                localStorage.setItem('defenser', hero.id);
            }

        });

        document.querySelector('#buttonFight').addEventListener('click', function() { battle(hero); });
    });

    displayUniverse();

}