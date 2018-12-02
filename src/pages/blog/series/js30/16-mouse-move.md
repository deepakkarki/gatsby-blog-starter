---
layout: post
title: Mouse move based text shadow animation
desc: >
  This is the 16th project of Wes Bos's JS30 series. We'll be creating an effect where the text shadow of an element is controlled by the mouse position!
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 16
---


This is the 16th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We'll be creating an effect where the text shadow of an element is controlled by the mouse position!

The video can be found here

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/zaz9gLI-Xac' frameborder='0' allowfullscreen></iframe></div>

The codepen for the starter code

<iframe height='457' scrolling='no' title='JS30-16-TextShadow-a' src='//codepen.io/deepakkarki/embed/XYYpdL/?height=407&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/XYYpdL/'>JS30-16-TextShadow-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


The starter files are minimal, the HTML element who's text shadow well be manipulating is the `h1` element below

```html
<div class="hero">
  <h1 contenteditable>🔥WOAH!</h1>
</div>
```

We have set the `contenteditable` attribute set on the `<h1>`, which means the user can edit the text contents of that element!

```css
h1 {
  text-shadow: 10px 10px 0 rgba(0.5, 0.5, 0.5, 0.4);
  font-size: 50px;
}
```

In the CSS we just set a simple text shadow to the title. (Iv'e changed the color values a little bit to make it appear shadow like!)

------

To get the text shadow to follow the cursor

1. Add a `mousemove` event listener
2. Extract the coordinates wrt to the window
3. Map the coordinates to the displacement of the text shadow
4. Update the text shadow


### Adding the event listener

```js
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

function shadow(e) {
}

// tracking the mouse will only be done in the div.hero area
// (in this case it is the whole page though)
hero.addEventListener('mousemove', shadow);
```

### Extract the coordinates

The event object's `pageX, pageY` properties give us the X, Y coordinates of the mouse wrt the page. But we need it with respect to the hero element, so we use the `offsetX, offsetY` properties. The [offsetX property](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX) of the MouseEvent provides the offset in the X coordinate of the mouse pointer between that event and the padding edge of the target node. So incase we're hovering over `h1` and not `div.hero` we have to adjust the x, y values.

```js
function shadow(e) {
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    //adjusting the values if e.target is not div.hero
    // by adding relative position of e.target
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
}
```

### Map the coordinates to the displacement of the text shadow

Let us assume the range of the displacement of the text shadow to be max of 50px from the actual text.

```js
let range = 50 * 2 //50 px * 2

function shadow(e) {
  let { offsetX: x, offsetY: y } = e;
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  // height and width of div.hero
  const { offsetWidth: width, offsetHeight: height } = hero;

  const xRange = Math.round( (x/width * range)  - range/2 );
  const yRange = Math.round( (y/height * range) - range/2 );
}
```

What we're doing here is simply mapping the range of width to current 'x' and 'y' to calculate the displacement. For ex, when `x=0` the x displacement is `-50px` and if `x == width`, the x displacement is `50px`. 

Basically, get the fraction, multiply to get the value, shift the origin. `x/width` give us the fraction, multiplying by `range` gives us the value, but we need to subtract `range/2` since the displacement is from the center of `h1` (origin is here, not top of screen) and going to the left would mean a negative value for x. Same applies for y.


### Update the text shadow

```js
function shadow(e) {
  //...
  text.style.textShadow = `${xRange}px ${yRange}px 0 rgba(255,0,255,0.7)`;
}
```

Update the text shadow with `xRange, yRange`.

-----

Final codepen -

<iframe height='465' scrolling='no' title='JS30-16-TextShadow-b' src='//codepen.io/deepakkarki/embed/pKKeJo/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/pKKeJo/'>JS30-16-TextShadow-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>