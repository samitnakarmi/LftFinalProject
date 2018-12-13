var hero = {
  top: 700,
  left: 550,
};

var missiles = [];
var enemies = [
  { left: 200, top: 100 },
  { left: 300, top: 100 },
  { left: 400, top: 100 },
  { left: 500, top: 100 },
  { left: 600, top: 100 },
  { left: 700, top: 100 },
  { left: 800, top: 100 },
  { left: 900, top: 100 },
  { left: 200, top: 175 },
  { left: 300, top: 175 },
  { left: 400, top: 175 },
  { left: 500, top: 175 },
  { left: 600, top: 175 },
  { left: 700, top: 175 },
  { left: 800, top: 175 },
  { left: 900, top: 175 },
];

var snd = new Audio('assets/gameSounds/shoot.wav');

document.onkeydown = function(e) {
  console.log(e);

  if (e.keyCode === 37) {
    // console.log('Left is pressed');
    hero.left = hero.left - 10;
    moveHero();
  } else if (e.keyCode === 39) {
    // console.log('right is pressed');
    hero.left = hero.left + 10;
    moveHero();
  } else if (e.keyCode === 38) {
    hero.top = hero.top - 10;
    moveHero();
  } else if (e.keyCode === 40) {
    hero.top = hero.top + 10;
    moveHero();
  } else if (e.keyCode === 32) {
    console.log('FIRE');

    snd.play();

    missiles.push({
      left: hero.left + 15,
      top: hero.top,
    });
    drawMissiles();
  }
};

function moveHero() {
  document.getElementById('hero').style.left = hero.left + 'px';
  document.getElementById('hero').style.top = hero.top + 'px';
}

function drawMissiles() {
  document.getElementById('missiles').innerHTML = '';
  for (var missile = 0; missile < missiles.length; missile++) {
    // alert('yes');
    document.getElementById(
      'missiles',
    ).innerHTML += `<div class = 'missile' style = 'left:${
      missiles[missile].left
    }px;
       top:${missiles[missile].top}px;'></div>`;
  }
}

function moveMissiles() {
  for (var missile = 0; missile < missiles.length; missile++) {
    missiles[missile].top = missiles[missile].top - 5;
  }
}

function drawEnemies() {
  document.getElementById('enemies').innerHTML = '';
  for (var enemy = 0; enemy < enemies.length; enemy++) {
    document.getElementById(
      'enemies',
    ).innerHTML += `<div class = 'enemy' style = 'left:${enemies[enemy].left}px;
       top:${enemies[enemy].top}px;'></div>`;
  }
}

function gameLoop() {
  setTimeout(gameLoop, 100);
  moveMissiles();
  drawMissiles();
  drawEnemies();
}
gameLoop();
