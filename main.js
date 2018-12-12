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
  }
  // else if (e.keyCode === 38) {
  //   hero.top = hero.top - 10;
  //   moveHero();
  // } else if (e.keyCode === 40) {
  //   hero.top = hero.top + 10;
  //   moveHero();
  // }
  else if (e.keyCode === 32) {
    console.log('FIRE');

    missiles.push({
      left: hero.left + 15,
      top: hero.top,
    });
    drawMissiles();
  }
};

function moveHero() {
  document.getElementById('hero').style.left = hero.left + 'px';
  // document.getElementById('hero').style.top = hero.top + 'px';
}

function drawMissiles() {
  document.getElementById('missiles').innerHTML = '';
  for (var missile = 0; missile < missiles.length; missile++) {
    // alert('yes');
    document.getElementById('missiles').innerHTML +=
      `<div class = 'missile' style = 'left:${missiles[missile].left}px;
       top:${missiles[missile].top}px;'></div>`;
  }
}
