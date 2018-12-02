---
layout: post
title: Click and drag
desc: >
  This is the 27th project of Wes Bos's JS30 series. Today we make a pretty neat click and drag to scroll interface where you will learn a whole lot about JavaScript events!
author:
  name: "Deepak Karki"
published: true
date: 2018-09-04
part: 27
---

This is the 27th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Today we make a pretty neat click and drag to scroll interface where you will learn a whole lot about JavaScript events!

Video - 

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/C9EWifQ5xqA' frameborder='0' allowfullscreen></iframe></div>

Starter code -

<iframe height='463' scrolling='no' title='JS30-27-ClickDrag-a' src='//codepen.io/deepakkarki/embed/mKQVXw/?height=363&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/mKQVXw/'>JS30-27-ClickDrag-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


We'll be scrolling horizontally the `div.items` list

```html
<div class="items">
    <div class="item item1">01</div>
    <div class="item item2">02</div>
    ...
</div>
```

Don't worry about the CSS, it just positions the items, adds perspective and color. We won't be needing that for our code.

-----

Steps to reach our desired effect -

1. Detect mouse events
2. Get initial data (is clicked, initial x, initial Y scroll)
3. Track drag
4. Update the scroll position


### Detect mouse events

We want to detect the drag only on the items div. `mousedown` we detect the click, `mouseup` to detect the release of the click. We only want to detect `mousemove` when the mouse has been clicked inside `div.items`. So when the user moves out of the items div, we set `isDown` to false.

```js
const slider = document.querySelector('.items');
// isDown checks if we have an active click
let isDown = false;

slider.addEventListener('mousedown', (e) => {
  console.log('mousedown')
  let isDown = true
  slider.classList.add('active')
});

slider.addEventListener('mouseleave', () => {
  console.log('mouseleave')
  let isDown = false
  slider.classList.remove('active')
});

slider.addEventListener('mouseup', () => {
  console.log('mouseup')
  let isDown = false
  slider.classList.remove('active')
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  console.log('mousemove - drag') //logs only if there is a drag
});
```

We also add the `active` class to `div.items` when the drag is enabled (i.e. `isDown == true`). The class highlights the background a little bit, changes the cursor, and makes the element slightly bigger. 


### Get initial data

The moment the user clicks anywhere on the slider, we record the current X position (`e.pageX`) and the current Y scroll (`scrollLeft`).

```js
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
  });
```

These values will be useful to move the scroll when there is a drag.


### Track the drag and update scroll

```js
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault(); 
    slider.scrollLeft = scrollLeft - (e.pageX - startX);
  });
```

We have the `e.preventDefault()` call to stop the default behavior, such as text selection.
Now if we drag the mouse to the left in the slider, we want the items to move left as well, for this to happen the scroll should move right. Let's keep it simple and say if we drag 25px left, we want the scroll to move 25px right. (You can later change the sensitivity).

`e.pageX` gives the new x-position, `startX` gives us the initial x-position before the drag began. Subtracting that would give us the distance moved horizontally. We then subtract the delta (`e.pageX - startX`) from the `scrollLeft`. We would have added the delta if we wanted the scroll to move in the direction of the mouse drag.

We can adjust the sensitivity by multiplying the delta with a positive number greater than 1. Eg. for 2x sensitivity : `(e.pageX - startX) * 2`


Here is the final code - 

<iframe height='459' scrolling='no' title='JS30-27-ClickDrag-b' src='//codepen.io/deepakkarki/embed/wXQGwY/?height=439&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/wXQGwY/'>JS30-27-ClickDrag-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>