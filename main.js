var hero = {
  top: 700,
  left: 550,
};

var missiles = [];

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
    // console.log('spaceBar');
    // document.getElementById('missile').style.display = 'block';
    // fire();

    missiles.push({
      left: hero.left + 15,
      top: hero.top,
    });
    console.log(missiles);
  }
};

function moveHero() {
  document.getElementById('hero').style.left = hero.left + 'px';
  document.getElementById('hero').style.top = hero.top + 'px';
}

function fire() {
  // for (i = hero.top, i < 800; i++)
  // {
  //   missl.style.display = "";
  //   }
}
