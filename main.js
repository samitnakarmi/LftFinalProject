var difficulty;

class Game {
  constructor(difficulty) {
    this.heroHasDied = false;
    this.snd = new Audio('assets/gameSounds/shoot.wav');
    this.snd2 = new Audio('assets/gameSounds/explosion.wav');
    this.MAX_HEIGHT = 800;
    this.MAX_WIDTH = document.getElementById('background').offsetWidth;
    this.ref = null;
    this.enemyCount = 0;
    this.difficulty = difficulty;
    this.enemies = [];
    this.bool = false;
    // this.enemies = [
    //   new Enemy(200, 100),
    //   { left: 300, top: 100 },
    //   { left: 400, top: 100 },
    //   { left: 500, top: 100 },
    //   { left: 600, top: 100 },
    //   { left: 700, top: 100 },
    //   { left: 800, top: 100 },
    //   { left: 900, top: 100 },
    //   { left: 200, top: 175 },
    //   { left: 300, top: 175 },
    //   { left: 400, top: 175 },
    //   { left: 500, top: 175 },
    //   { left: 600, top: 175 },
    //   { left: 700, top: 175 },
    //   { left: 800, top: 175 },
    //   { left: 900, top: 175 },
    // ];
    for (var left = 200; left <= 1000; left = left + 100) {
      this.enemies.push(new Enemy(left, 100));
      this.enemies.push(new Enemy(left, 175));
      this.enemyCount = this.enemyCount + 2;
    }

    this.hero = new Hero(700, 550);

    var heroElement = document.getElementById('hero');
    heroElement.style.left = '550px';
    heroElement.style.top = '700px';
    this.missiles = [];

    var enemyElement = document.getElementById('enemy');

    //-------------Keys Pressed----------------
    document.onkeydown = (e) => {
      if (!this.heroHasDied) {
        if (e.keyCode === 37 && this.hero.left >= 50) {
          this.hero.left = this.hero.left - 10;
          //sprite left here
          heroElement.style.backgroundPosition = '0px 0px';
          this.hero.moveHero();
        } else if (e.keyCode === 39 && this.hero.left <= this.MAX_WIDTH - 50) {
          this.hero.left = this.hero.left + 10;
          //sprite right here
          heroElement.style.backgroundPosition = '-328px 0px';

          this.hero.moveHero();
        } else if (e.keyCode === 38 && this.hero.top >= 50) {
          this.hero.top = this.hero.top - 10;
          this.hero.moveHero();
        } else if (e.keyCode === 40 && this.hero.top <= this.MAX_HEIGHT - 50) {
          this.hero.top = this.hero.top + 10;
          this.hero.moveHero();
        } else if (e.keyCode === 32) {
          this.snd.play();
          this.missiles.push({
            left: this.hero.left + 15,
            top: this.hero.top,
          });
          // drawMissiles();
          // enemyMissiles();
          // enemyDrawMissiles();
          // enemyMoveMissiles();
        }
      }
    };
    document.onkeyup = (e) => {
      heroElement.style.backgroundPosition = '-165px 0px';
    };
  }

  drawEnemies() {
    // console.log(document);
    document.getElementById('enemies').innerHTML = '';
    for (var enemy = 0; enemy < this.enemies.length; enemy++) {
      document.getElementById('enemies').innerHTML += `<div class = 'enemy' style = 'left:${this.enemies[enemy].left}px;
				top:${this.enemies[enemy].top}px;'></div>`;
    }
  }

  moveEnemies() {
    for (var enemy = 0; enemy < this.enemies.length; enemy++) {
      if (this.bool) {

        this.enemies[enemy].left = this.enemies[enemy].left + (1 + this.difficulty);
        if (this.enemies[enemy].left >= this.MAX_WIDTH - 80) {
          this.bool = !this.bool;
          for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].top = this.enemies[i].top + (25 + this.difficulty);
          }
        }
      } else {
        this.enemies[enemy].left = this.enemies[enemy].left - 2 * (1 + this.difficulty);
        if (this.enemies[enemy].left <= 80) {
          this.bool = !this.bool;
          for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].top = this.enemies[i].top + (25 + this.difficulty);
          }
        }
      }

      if (this.enemies[enemy].top >= 745) {
        this.heroHasDied = true;
        this.gameOver();
      }
    }
  }

  drawMissiles() {
    document.getElementById('missiles').innerHTML = '';
    for (var missile = 0; missile < this.missiles.length; missile++) {
      document.getElementById('missiles').innerHTML += `<div class = 'missile' style = 'left:${this.missiles[missile].left}px;
				top:${this.missiles[missile].top}px;'></div>`;
    }
  }

  moveMissiles() {
    for (var missile = 0; missile < this.missiles.length; missile++) {
      this.missiles[missile].top = this.missiles[missile].top - 15;
    }
  }

  // moveEnemySprite() {
  //   enemyElement.style.backgroundPosition = '-328px 0px';
  // }

  collisionDetection() {
    for (var enemy = 0; enemy < this.enemies.length; enemy++) {
      for (var missile = 0; missile < this.missiles.length; missile++) {
        if (
          this.missiles[missile].top <= this.enemies[enemy].top + 50 &&
          this.missiles[missile].top >= this.enemies[enemy].top &&
          this.missiles[missile].left <= this.enemies[enemy].left + 50 &&
          this.missiles[missile].left >= this.enemies[enemy].left
        ) {
          // console.log('HIT!');
          this.enemies.splice(enemy, 1);
          this.snd2.play();
          this.missiles.splice(missile, 1);
        }
      }
    }
  }

  heroCollision() {
    for (var x = 0; x < this.enemies.length; x++) {
      if (
        this.hero.top <= this.enemies[x].top + 50 &&
        this.hero.top >= this.enemies[x].top &&
        this.hero.left <= this.enemies[x].left + 50 &&
        this.hero.left >= this.enemies[x].left
      ) {
        this.heroHasDied = true;
        this.gameOver();
        // console.log('heroHit');
      }
    }
  }

  // enemyMissileLauncher() {
  //   var max = this.enemyCount;
  //   var min = 0;
  //   var random = Math.floor(Math.random() * (max - min)) + min;
  // }

  play() {
    // console.log('play function');
    this.moveMissiles();
    this.drawMissiles();
    this.moveEnemies();
    this.drawEnemies();
    // enemyDrawMissiles();
    // enemyMoveMissiles();

    this.collisionDetection();
    this.heroCollision();

    if (this.enemies.length === 0) {
      alert('You win');
      // for (var left = 200; left <= 1000; left = left + 100) {
      //   this.enemies.push(new Enemy(left, 100));
      //   this.enemies.push(new Enemy(left, 175));
      //   this.enemyCount = this.enemyCount + 2;
      // }
    }
  }

  gameloop() {
    var self = this;
    this.ref = setInterval(() => {
      self.play();
    }, 100);
  }

  gameOver() {
    var body = document.getElementById('hero');
    body.style.backgroundImage = "url('assets/heroDie.jpg')";
    clearInterval(this.ref);
    var x = document.getElementById('myDialog');
    x.show();
  }
}

class Hero {
  constructor(top, left) {
    this.top = top;
    this.left = left;
  }

  moveHero() {
    document.getElementById('hero').style.left = this.left + 'px';
    document.getElementById('hero').style.top = this.top + 'px';
  }
}

class Enemy {
  constructor(left, top) {
    this.left = left;
    this.top = top;
  }
}

var game;

function gameLoop(difficulty) {
  var x = difficulty;
  game = new Game(x);
  game.gameloop();
  // setInterval(() => {
  //   game.play();
  // }, 100);
}

function replay() {
  // console.log('replay called');

  var x = document.getElementById('myDialog');
  x.close();

  var body = document.getElementById('hero');
  body.style.backgroundImage = "url('assets/airplane.png')";

  gameLoop(difficulty);
}

function start(level) {
  console.log(level.innerText);

  var lvl = level.innerText;
  switch (lvl) {
    case 'Easy':
      difficulty = 0;
      break;
    case 'Medium':
      difficulty = 1;
      break;
    case 'Difficult':
      difficulty = 2;
    default:
      break;
  }

  console.log(difficulty);

  var element = document.getElementById('welcome');
  element.style.visibility = 'hidden';
  element.parentNode.removeChild(element);
  document.getElementById('background').style.visibility = 'visible';

  gameLoop(difficulty);
}




