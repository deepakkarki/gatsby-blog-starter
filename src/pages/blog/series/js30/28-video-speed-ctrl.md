---
layout: post
title: Video speed controller
desc: >
  This is the 28th project of Wes Bos's JS30 series. Today we'll build an experimental video speed controller UI.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-04
part: 28
---


This is the 28th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Today we'll build an experimental video speed controller UI.

Video -

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/8gYN_EDMg_M' frameborder='0' allowfullscreen></iframe></div>

Starter code -

<iframe height='465' scrolling='no' title='Js30-28-speedController-a' src='//codepen.io/deepakkarki/embed/zaMoPN/?height=265&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/zaMoPN/'>Js30-28-speedController-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


We'll be building a video speed controller where the user can control the video speed just by hovering the mouse over the controller bar. This will be a mixture of various things we've dealt before!

The HTML we have 

```html
<div class="wrapper">
    <video class="flex" width="765" height="430" src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" loop controls></video>
    <p>
    <div class="speed">
      <div class="speed-bar">1×</div>
    </div>
  </div>
```

`video.flex` is the video element whose playback rate we'll change, the `div.speed` element is the speed controller and `div.speed-bar` is the current playback speed indicator.

Let's select all the DOM elements we'll use 

```js
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('video');

//min, max playback speed
const min = 0.4;
const max = 4;
```

Listen to mouse move on the speed controller

```js
speed.addEventListener('mousemove', handleMove)
```

The `handleMove` function does two things - changes the height of `div.speed-bar` and changes the playback rate of the video.


## Changing the speed bar height

```js
function handleMove(e) {
  const y = e.pageY - this.offsetTop
  const percent = y / this.offsetHeight
  const height = Math.round(percent * 100) + '%'
  bar.style.height = height
}
```

1. Calculate the y value of the mouse within the speed controller. `y = e.pageY - this.offsetTop`
2. Get the fraction which it represents, i.e. y value / total height. `percent = y / this.offsetHeight`
3. Get the height in %, `height = Math.round(percent * 100) + '%'`
4. Set the `speed-bar` to that height. `bar.style.height = height`


## Changing the playback rate

```js
// in handleMove()
const playbackRate = percent * (max - min) + min;
bar.textContent = playbackRate.toFixed(2) + '×';
video.playbackRate = playbackRate;
```

To get the playback rate we map the `percentage` into the `min` to `max` range, and add the min offset. That is how we get `playbackRate = percent * (max - min) + min`.

We then just update the text in the speed bar and the playback rate of the video.


This completes our exercise. The final codepen is below -

<iframe height='472' scrolling='no' title='Js30-28-speedController-b' src='//codepen.io/deepakkarki/embed/RJqojB/?height=372&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/RJqojB/'>Js30-28-speedController-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>