---
layout: post
title: Whack a mole
desc: >
  This is the 30th project of Wes Bos's JS30 series. Today we'll build whack a mole game from scratch in vanilla JS!
author:
  name: "Deepak Karki"
published: true
date: 2018-09-04
part: 30
---


This is the 30th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Today we'll build whack a mole game from scratch in vanilla JS!

Video -

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/toNFfAaWghU' frameborder='0' allowfullscreen></iframe></div>

Starter code -

<iframe height='465' scrolling='no' title='JS30-30-WhackMole-a' src='//codepen.io/deepakkarki/embed/pKQqwZ/?height=265&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/pKQqwZ/'>JS30-30-WhackMole-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


The HTML we have -

```html
<div class="game">
    <div class="hole hole1">
      <div class="mole"></div>
    </div>
    <div class="hole hole2">
      <div class="mole"></div>
    </div>
    ...
</div>
```

There are six holes in `div.game`. Each hole holds a mole (`div.mole`) and the dirt (`.hole::after`). By default the mole is positioned 'absolute' with 100% displacement from the top. Given that the hole has overflow to hidden, the mole isn't seen. 

When the class `up` is added to the hole, then the mole transitions up, as top displacement now becomes 0px.

```css
.hole.up .mole {
  top:0;
}
```

The JS given to us -

```js
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
```


There are various moving parts to this game,

1. Pick a random amount of time a mole should show up.
2. Pick a random hole for a mole to show up.
3. Get the mole to come up for the random amount of time, and go down.
4. When the game starts (run on click, for 10s) do the above in a loop.
5. Check for clicks on a mole, update the score

The `Math.random()` function returns a floating-point, pseudo-random number in the range 0–1 (inclusive of 0, but not 1) with approximately uniform distribution over that range — which you can then scale to your desired range. The implementation selects the initial seed to the random number generation algorithm; it cannot be chosen or reset by the user.

We'll be using `Math.random` a lot, see the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) for more.

### Random amount of time

```js
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
```

Get a random amount of time between min and max time. For our app, min and max represent milliseconds.


### Random hole

`randomHole()` returns a random hole DOM element.

```js
let lastHole;
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('duplicate hole');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
```

We pick an index (`idx`) between 0 and 5, viz the range of valid indices of holes array. If the hole is the same as the last one picked, we just call the function again. We store the most recent hole chosen in the `lastHole` variable.


### Making the mole appear and disappear

`peep()` makes a mole appear and disappear for a random amount of time in a random hole.

```js
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
  }, time);
}
```

Once we pick the random time period (between 200ms and 1s) and hole, we add the `up` class to the hole element, then register a callback to remove the `up` class after the given period of time.


### Starting the game loop

We start the game when the start button (`<button onClick="startGame()">Start!</button>`) is clicked.

```js
let timeUp = false;
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000)
}
```

The game runs for 10 seconds. `timeUp` keeps track whether the game is running. Score is reset to zero and `peep()` is called. Then a timeout is set to run at 10 seconds, which marks `timeUp` as true.

We need to make a tiny modification to the `peep()` function,

```js
// In the setTimeout callback
hole.classList.remove('up');
if (!timeUp) peep();
```

`peep()` calls itself if the game is running!


### scoring mechanism

The `bonk()` function tracks the hits and updates the score

```js
function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

  moles.forEach(mole => mole.addEventListener('click', bonk));
```

Each mole has a click event listener registered. `bonk()` checks if the click is trusted (i.e. not scripted / automated in some way), and then updates the score and the score board.

Learn more about trusted events @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)


Here is the final code -

<iframe height='465' scrolling='no' title='JS30-30-WhackMole-b' src='//codepen.io/deepakkarki/embed/qKQvWx/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/qKQvWx/'>JS30-30-WhackMole-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>