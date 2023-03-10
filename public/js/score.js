//sets initial score to 0
localStorage.setItem('score_vr_race', 0);
let collisionCar = false;
let collisionCoin = false;
let timerIdCar = 0;
let timerIdCoin = 0;
let visibleCoin = true;

//function to check whether two cars are colliding on the basis if their z axis
//coordinates
function checkCollision(z1, z2) {
    if (z1 >= z2 - 3 && z1 <= z2 + 3) {
        return true;
    }

    return false;
}

//updates score
function updateDisplayScore() {
    var scoredisplay = document.getElementById("score_overlay");
    scoredisplay.setAttribute("text", "align: center; width: 100;color:white; height:100; value:" + localStorage.getItem('score_vr_race') + ";");
}

//checks for collisions
document.getElementById('curve2').addEventListener('alongpath-trigger-activated', function() {
    collisionCar = false;
    timerIdCar = setInterval(function() {
        coord_moving = document.getElementById('moving-car').getAttribute('position');
        coord_fixed = document.getElementById('fixed-car').getAttribute('position');
        collisionCar = checkCollision(coord_fixed.z, coord_moving.z)
        if (collisionCar) {
            var score = localStorage.getItem('score_vr_race');
            localStorage.setItem('score_vr_race', 0);
            alert('You Lost! Your Score is ' + score);
            starttime = updatetime;
            clearInterval(timerIdCar);
        }
    }, 1);
});

//increments score in case of avoiding collision successfully
document.getElementById('curve2').addEventListener('alongpath-trigger-deactivated', function() {
    clearInterval(timerIdCar);
    if (collisionCar) {
        collisionCar = false;
    } else {
        localStorage.setItem('score_vr_race', parseInt(localStorage.getItem('score_vr_race')) + 1);
    }
    updateDisplayScore();
    console.log(localStorage.getItem('score_vr_race'));
});

document.getElementById('coin1').addEventListener('alongpath-trigger-activated', function() {
    document.getElementById('coin').setAttribute('visible',true);
});

//increments score if user collects coin
document.getElementById('coin2').addEventListener('alongpath-trigger-activated', function() {



    collisionCoin = false;
    timerIdCoin = setInterval(function() {
        coord_fixed = document.getElementById('fixed-car').getAttribute('position');
        coord_coin = document.getElementById('coin').getAttribute('position');
        collisionCoin = checkCollision(coord_fixed.z, coord_coin.z)
        if (collisionCoin) {
            var score = localStorage.getItem('score_vr_race');
            localStorage.setItem('score_vr_race', parseInt(localStorage.getItem('score_vr_race')) + 5);
            document.getElementById('coin').setAttribute('visible',false);
            clearInterval(timerIdCoin);
        }
    }, 1);
});

document.getElementById('coin2').addEventListener('alongpath-trigger-deactivated', function() {
    clearInterval(timerIdCoin);
    if (collisionCoin) {
        collisionCoin = false;
        updateDisplayScore();
        return;
    }
    console.log(localStorage.getItem('score_vr_race'));
});


