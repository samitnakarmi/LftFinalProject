class Game {
  constructor() {
    this.heroHasDied = false;
    this.snd = new Audio('assets/gameSounds/shoot.wav');
    this.snd2 = new Audio('assets/gameSounds/explosion.wav');
    this.heroHasDied = false;
    this.MAX_HEIGHT = 800;
    this.MAX_WIDTH = document.getElementById('background').offsetWidth;
    this.ref = null;
    this.enemyCount = 0;

    this.enemies = [];
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

    //-------------Keys Pressed----------------
    document.onkeydown = (e) => {
      if (!this.heroHasDied) {
        if (e.keyCode === 37 && this.hero.left >= 50) {
          this.hero.left = this.hero.left - 10;
          this.hero.moveHero();
        } else if (e.keyCode === 39 && this.hero.left <= this.MAX_WIDTH - 50) {
          this.hero.left = this.hero.left + 10;
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
  }

  drawEnemies() {
    console.log(document);
    document.getElementById('enemies').innerHTML = '';
    for (var enemy = 0; enemy < this.enemies.length; enemy++) {
      document.getElementById('enemies').innerHTML += `<div class = 'enemy' style = 'left:${this.enemies[enemy].left}px;
				top:${this.enemies[enemy].top}px;'></div>`;
    }
  }

  moveEnemies() {
    for (var enemy = 0; enemy < this.enemies.length; enemy++) {
      this.enemies[enemy].top = this.enemies[enemy].top + 1;
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
        // console.log('heroHit');

        var body = document.getElementById('hero');
        body.style.backgroundImage = "url('assets/heroDie.jpg')";
        clearInterval(this.ref);
        var x = document.getElementById('myDialog');
        x.show();
      }
    }
  }

  enemyMissileLauncher() {
    var max = this.enemyCount;
    var min = 0;
    var random = Math.floor(Math.random() * (max - min)) + min;
  }

  play() {
    console.log('play function');
    this.moveMissiles();
    this.drawMissiles();
    this.moveEnemies();
    this.drawEnemies();
    // enemyDrawMissiles();
    // enemyMoveMissiles();

    this.collisionDetection();
    this.heroCollision();
    if (this.enemies.length === 0) {
      for (var left = 200; left <= 1000; left = left + 100) {
        this.enemies.push(new Enemy(left, 100));
        this.enemies.push(new Enemy(left, 175));
        this.enemyCount = this.enemyCount + 2;
      }
    }
  }

  gameloop() {
    var self = this;
    this.ref = setInterval(() => {
      self.play();
    }, 100);
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

function gameLoop() {
  game = new Game();
  game.gameloop();
  // setInterval(() => {
  //   game.play();
  // }, 100);
}

function replay() {
  console.log('replay called');

  var x = document.getElementById('myDialog');
  x.close();

  var body = document.getElementById('hero');
  body.style.backgroundImage = "url('assets/hero.png')";

  gameLoop();
}

gameLoop();
