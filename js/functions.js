
/*************** Random number *****************************/
function getRandomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/********** Fighters choice ********************************/
function changeFighter(){
    document.getElementById('fighter1').addEventListener('change',function(){
        if(this.checked) document.getElementById('fighter2').checked = false;
    });
    document.getElementById('fighter2').addEventListener('change',function(){
        if(this.checked) document.getElementById('fighter1').checked = false;
    });
}
/*********** Universe choice ******************************/
function changeUniverse(){
    document.getElementById('universe').addEventListener('change',function(){
        localStorage.setItem('universe', this.value);
        location.reload();
    });
}
/*********** Close modal Caractristic *********************/
function closeStats(){
    document.querySelector('.allDetails').addEventListener('click',function(){
        this.style.display = 'none';
    });
}
/*********** Display fighters *****************************/
function displayFighter(fighter,hero){
    document.querySelector(fighter).firstElementChild.innerText = hero.name;
    document.querySelector(fighter).style= `background: url(${hero.images.lg}) no-repeat;background-size: contain;`;
    // EventListener on list of fighters
    document.querySelector(fighter).addEventListener('click',function(){
        document.querySelector('.allDetails').style.display = 'flex';
        displayStats('.textDetails',hero, true);
    });
}
/*************** Without Duplicate ***********************/
function findDuplicates(arr) {
    const filtered = arr.filter((item, index) => arr.indexOf(item) !== index);
    return [...new Set(filtered)]
}
/*************** Display list universe without duplicate */
function displayUniverse(){
    const duplicates = findDuplicates(universe);
    duplicates.sort();
    duplicates.forEach((item) => {
        const option = document.createElement('option');
        const valueOption = (item == '') ? 'Tous' : item;
        option.setAttribute('value', valueOption);
        option.selected = (localStorage.getItem('universe') == option.value) ? true : '';
        option.innerText = valueOption;
        document.querySelector('#universe').append(option);
    });

    changeUniverse();
}
/*************** Display stats ***************************/
function displayStats(nameDetail,hero,valid){
    let statistics = [];
    let caractristics = [];
    const stats = document.querySelector(nameDetail);
    stats.innerHTML = '';
    Object.getOwnPropertyNames(hero.powerstats).forEach(title => { statistics.push(title); });
    Object.getOwnPropertyNames(hero.biography) .forEach(title => { caractristics.push(title); });
    Object.getOwnPropertyNames(hero.appearance).forEach(title => { caractristics.push(title); });

    if(valid){
        stats.innerHTML += `<div class="imageStat"><img src="${hero.images.sm}"></div>`;
        Object.values(hero.biography).forEach(function (value, key) {
            stats.innerHTML += `<div class="entitledStat">${caractristics[key]}</div><div class="valueStat">${value  == '' ? 'Unknown' : value}</div>`;
        });
        Object.values(hero.appearance).forEach(function (value, key) {
            stats.innerHTML += `<div class="entitledStat">${caractristics[key+Object.getOwnPropertyNames(hero.biography).length]}</div><div class="valueStat">${value}</div>`;
        });
        stats.innerHTML += `<div class="entitledStat">Combat formula</div><div class="valueStat formula">Affichage formule de combat</div>`;
    }
    else{
        Object.values(hero.powerstats).forEach(function (value, key) {
            stats.innerHTML += `<div class="entitledStat">${statistics[key]}</div><div class="valueStat ${statistics[key]}">${value}</div>`;
        });
    }
}
/*************** Display heroes ***************************/
function displayHeroes(todoList){
    todoList.forEach(hero => {
        hero.powerstats.life = hero.powerstats.durability * 10;
        hero.powerstats.shield = getRandomNumber(10,20)+20;
        hero.powerstats.weapon = getRandomNumber(10,20);

        const result = (hero.biography.publisher === null) ? 'Unknown universe' : hero.biography.publisher.trim();
        universe.push(result); // Traitement des univers inconnus

        const heroDetail = document.createElement("button");
        if(localStorage.getItem('universe') === hero.biography.publisher || localStorage.getItem('universe') === 'Tous' || localStorage.getItem('universe') === null){
            heroDetail.classList.add('choiceHero');
            heroDetail.id = hero.id;

            const image = document.createElement("img");
            image.src= hero.images.lg;
            image.alt = image.title = hero.name;
            heroDetail.append(image);
            document.querySelector('.heroes').appendChild(heroDetail);
        }

        changeFighter();
        closeStats();

        let buttonBefore1 = undefined, buttonBefore2 = undefined;

        heroDetail.addEventListener('click',function(){
            if(document.getElementById('fighter1').checked){
                displayFighter('.firstFighter',hero);
                displayStats('.combatScene1',hero,false);
                localStorage.setItem('attacker', hero.id);
            }
            else if(document.getElementById('fighter2').checked){
                displayFighter('.secondFighter',hero);
                displayStats('.combatScene2',hero,false);
                localStorage.setItem('defenser', hero.id);
            }
        });

        document.querySelector('#buttonFight').addEventListener('click', function() { battle(hero); });
    });

    displayUniverse();
}