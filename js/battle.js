
function setResultRound(a,b){
    const resultBattle = "\n\t"+ a +" a gagné"+"\n\t"+ b +" a perdu\n";
    localStorage.setItem( 'battle',  resultBattle );
    console.log(resultBattle);
}

function setRound(a,b,c,d){
    console.log("\tVie:",a,"\t Attaque:",b,"\t <==> \t Vie:",c," \t Attaque:",d);
}

function reductTab(loser){
    //heroes.splice(heroes.indexOf(loser),1);
}

function battle(hero)
{
    let attackerFight, defenserFight, winner, loser;

    if( hero.id === parseInt(localStorage.getItem("attacker"))){
        heroes.fighter1 = hero;
    }
        if( hero.id === parseInt(localStorage.getItem("defenser"))){
        heroes.fighter2 = hero;

        console.log("\n[",heroes.fighter1.name," vs ",  heroes.fighter2.name,"]\n\n");

        while(heroes.fighter1.powerstats.life > 0 && heroes.fighter2.powerstats.life > 0) {

            attackerFight = heroes.fighter1.powerstats.intelligence + getRandomNumber(0, heroes.fighter1.powerstats.weapon);
            defenserFight = heroes.fighter2.powerstats.intelligence + getRandomNumber(0, heroes.fighter2.powerstats.shield);

            if(attackerFight > defenserFight && defenserFight > 0)      { heroes.fighter2.powerstats.life -= attackerFight; winner = heroes.fighter1; loser = heroes.fighter2;/*reductTab(heroes.fighter2);*/ }
            else if(defenserFight > attackerFight && attackerFight > 0) { heroes.fighter1.powerstats.life -= defenserFight; winner = heroes.fighter2; loser = heroes.fighter1;/*reductTab(heroes.fighter1);*/ }

            if(heroes.fighter1.powerstats.life > 0 || heroes.fighter2.powerstats.life > 0){ setRound(heroes.fighter1.powerstats.life,attackerFight,heroes.fighter2.powerstats.life,defenserFight); }

        }
        if(heroes.fighter1.powerstats.life <= 0 && heroes.fighter1.powerstats.life !== heroes.fighter2.powerstats.life)      { setResultRound(winner.name, loser.name); }
        else if(heroes.fighter2.powerstats.life <= 0 && heroes.fighter1.powerstats.life !== heroes.fighter2.powerstats.life) { setResultRound(winner.name, loser.name); }
        else if(heroes.fighter1.powerstats.life === heroes.fighter2.powerstats.life) { setRound(heroes.fighter1.powerstats.life,attackerFight,heroes.fighter2.powerstats.life,defenserFight);console.log("Exaequo !!!!!"); }

    }
}
