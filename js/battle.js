/*************** Init combat's text ***************************/
const textCombat = document.querySelector('.textCombat');
textCombat.innerHTML = '';

/*************** Display result roundFinal ********************/
function setResultRound(a,b){
    const resultBattle =  a +" a gagné"+" - "+ b +" a perdu";
    localStorage.setItem( 'resultBattle',  resultBattle );
    console.log(resultBattle);
    textCombat.innerHTML += '<p style="width: 100%;color:lime;">'+resultBattle+'</p>';
}
/*************** Display rounds *******************************/
function setRound(a,b,c,d){
    console.log("\tVie:",a,"\t Attaque:",b,"\t <==> \t Vie:",c," \t Attaque:",d);
    const resultRound = "\tVie:"+a+"\t Attaque:"+b+"\t <==> \t Vie:"+c+" \t Attaque:"+d;
    textCombat.innerHTML += '<p>'+resultRound+'</p>';
}

// function reductTab(loser){
//     heroes.splice(heroes.indexOf(loser),1);
// }

/*************** Launch rounds ********************************/
let interval,attackerFight, defenserFight, attackerLife, defenserLife, winner, loser;

function fight(heroes){
    attackerFight = heroes.fighter1.powerstats.intelligence +
                    getRandomNumber(0, heroes.fighter1.powerstats.weapon) +
                    heroes.fighter1.powerstats.strength;

    defenserFight = heroes.fighter2.powerstats.intelligence +
                    getRandomNumber(0, heroes.fighter2.powerstats.shield)+
                    heroes.fighter2.powerstats.strength;

    if(attackerFight > defenserFight && defenserFight > 0) {
        heroes.fighter2.powerstats.life -= attackerFight;
        winner = heroes.fighter1;
        loser = heroes.fighter2;
    }
    else if(defenserFight > attackerFight && attackerFight > 0) {
        heroes.fighter1.powerstats.life -= defenserFight;
        winner = heroes.fighter2;
        loser = heroes.fighter1;
    }

    if(heroes.fighter1.powerstats.life > 0 || heroes.fighter2.powerstats.life > 0){ setRound(heroes.fighter1.powerstats.life,attackerFight,heroes.fighter2.powerstats.life,defenserFight); }

    if(heroes.fighter1.powerstats.life <= 0 && heroes.fighter1.powerstats.life !== heroes.fighter2.powerstats.life)      { setResultRound(winner.name, loser.name); }
    else if(heroes.fighter2.powerstats.life <= 0 && heroes.fighter1.powerstats.life !== heroes.fighter2.powerstats.life) { setResultRound(winner.name, loser.name); }
    else if(heroes.fighter1.powerstats.life === heroes.fighter2.powerstats.life) {
        console.log("Exaequo !!!!!");
        textCombat.innerHTML += '<p style="width: 100%;color:yellow;">Exaequo !!!!!</p>';
    }
    if(heroes.fighter1.powerstats.life <= 0 || heroes.fighter2.powerstats.life <= 0){
        // Remove Fighters
        localStorage.removeItem('attacker');
        localStorage.removeItem('defenser');
        // Stop Interval
        clearInterval(interval);
    }

    document.querySelector('.firstFighter .lifeBar .progressBar').style.width   =  pourcent()[0]+"%";
    document.querySelector('.secondFighter .lifeBar .progressBar').style.width  =  pourcent()[1]+"%";

}

function pourcent(){
    let pourcent1 = Math.round((heroes.fighter1.powerstats.life / localStorage.getItem('attackerTotal')) * 100);
    let pourcent2 = Math.round((heroes.fighter2.powerstats.life / localStorage.getItem('defenserTotal')) * 100);

    if(pourcent1 < 0){ pourcent1 = 0; }
    if(pourcent2 < 0){ pourcent2 = 0; }

    return [pourcent1, pourcent2];
}

function battle(hero)
{
    if( hero.id === parseInt(localStorage.getItem("attacker")) ){
        heroes.fighter1 = hero;
    }
    if( hero.id === parseInt(localStorage.getItem("defenser")) ){

        heroes.fighter2 = hero;
        console.log("Démarrage du combat entre " + heroes.fighter1.name + " et " +  heroes.fighter2.name);
        interval =  setInterval(function(){ fight(heroes) }, 1500);

    }
}