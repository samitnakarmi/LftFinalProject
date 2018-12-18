var snd = new Audio('assets/gameSounds/shoot.wav');
var snd2 = new Audio('assets/gameSounds/explosion.wav');
var heroHasDied = false;
var MAX_HEIGHT = 800;
var MAX_WIDTH = document.getElementById('background').offsetWidth;

//-------------Keys Pressed----------------
document.onkeydown = function(e) {
  if (!heroHasDied) {
    if (e.keyCode === 37 && hero.left >= 50) {
      hero.left = hero.left - 10;
      hero.moveHero();
    } else if (e.keyCode === 39 && hero.left <= MAX_WIDTH - 50) {
      hero.left = hero.left + 10;
      hero.moveHero();
    } else if (e.keyCode === 38 && hero.top >= 50) {
      hero.top = hero.top - 10;
      hero.moveHero();
    } else if (e.keyCode === 40 && hero.top <= MAX_HEIGHT - 50) {
      hero.top = hero.top + 10;
      hero.moveHero();
    } else if (e.keyCode === 32) {
      snd.play();
      missiles.push({
        left: hero.left + 15,
        top: hero.top,
      });
      drawMissiles();
    }
  }
};

//-------------Keys Pressed end----------------

//----------------------hero stuffs begin------------------->

function Hero(top, left) {
  this.top = top;
  this.left = left;
}

Hero.prototype.moveHero = function() {
  document.getElementById('hero').style.left = hero.left + 'px';
  document.getElementById('hero').style.top = hero.top + 'px';
};

var hero;
//----------------------hero stuffs end------------------->

//----------------------enemies stuffs begin------------------->

var enemies;

function initializer() {
  enemies = [
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

  hero = new Hero(700, 550);

  var heroElement = document.getElementById('hero');
  heroElement.style.left = '550px';
  heroElement.style.top = '700px';
  missiles = [];
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

function moveEnemies() {
  for (var enemy = 0; enemy < enemies.length; enemy++) {
    enemies[enemy].top = enemies[enemy].top + 1;
  }
}
//----------------------enemies stuffs end------------------->

//----------------------missiles stuffs begin------------------->

var missiles;

function drawMissiles() {
  document.getElementById('missiles').innerHTML = '';
  for (var missile = 0; missile < missiles.length; missile++) {
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
    missiles[missile].top = missiles[missile].top - 7;
  }
}

//----------------------missiles stuffs end------------------->

function collisionDetection() {
  // alert('hi');
  for (var enemy = 0; enemy < enemies.length; enemy++) {
    for (var missile = 0; missile < missiles.length; missile++) {
      if (
        missiles[missile].top <= enemies[enemy].top + 50 &&
        missiles[missile].top >= enemies[enemy].top &&
        missiles[missile].left <= enemies[enemy].left + 50 &&
        missiles[missile].left >= enemies[enemy].left
      ) {
        // console.log('HIT!');
        enemies.splice(enemy, 1);
        snd2.play();
        missiles.splice(missile, 1);
      }
    }
  }
}

function heroCollision() {
  for (var x = 0; x < enemies.length; x++) {
    if (
      hero.top <= enemies[x].top + 50 &&
      hero.top >= enemies[x].top &&
      hero.left <= enemies[x].left + 50 &&
      hero.left >= enemies[x].left
    ) {
      heroHasDied = true;
      // console.log('heroHit');

      // document.getElementById('hero').style.backgroundImage =

      // document.getElementById('hero').style.backgroundImage = "url('./assets/ heroDie.jpg'
      // )"

      var body = document.getElementById('hero');
      body.style.backgroundImage = "url('assets/heroDie.jpg')";
      clearTimeout(ref);

      var x = document.getElementById('myDialog');
      x.show();
    }
  }
}

var ref;

function gameLoop() {
  ref = setTimeout(gameLoop, 100);
  moveMissiles();
  drawMissiles();
  moveEnemies();
  drawEnemies();
  collisionDetection();
  heroCollision();
}

initializer();
gameLoop();

function replay() {
  console.log('replay called');
  heroHasDied = false;

  var x = document.getElementById('myDialog');
  x.close();

  var body = document.getElementById('hero');
  body.style.backgroundImage = "url('assets/hero.png')";

  
  initializer();
  gameLoop();
}
