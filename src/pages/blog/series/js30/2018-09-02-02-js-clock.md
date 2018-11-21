---
layout: post
title: CSS and JS clock
desc: >
  This is the second project of Wes Bos's JS30 series. We will be building a "clock" as using 'div's, some CSS animation and javascript. The idea is to replicate a minimalistic analog wall clock with an hours, minutes and seconds hand.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-02
part: 2
---


This is the second project of Wes Bos's [JS30 series](https://JavaScript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We will be building a "clock" as using `div`s, some CSS animation and javascript. The idea is to replicate a minimalistic analog wall clock with an hours, minutes and seconds hand. Here is the video below -

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/xu87YWbr4X0' frameborder='0' allowfullscreen></iframe></div>

Here is the codepen for the starter file

<iframe height='520' scrolling='no' title='JS30-02-clock-a' src='//codepen.io/deepakkarki/embed/wXqaJv/?height=520&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/wXqaJv/'>JS30-02-clock-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The HTML is simple and minimalistic 

```html
<div class="clock">
  <div class="clock-face">
    <div class="hand hour-hand"></div>
    <div class="hand min-hand"></div>
    <div class="hand second-hand"></div>
  </div>
</div>
```

The `div.clock` is the circular outer body of the clock, the `div.clock-face` is the container for the hands. The three children divs represent the hour, minute and seconds hand respectively (as is evident by the class names).

The CSS is slightly more interesting (and involved). The clock outline is just a div with the border radius and border width set. Some box shadow for the styling. I learnt that you can apply multiple box shadows to a single element, something I did not know before!

General box shadow format : `box-shadow: offset-x | offset-y | blur-radius | spread-radius | color`. You can have multiple box shadows by comma separating the values as seen below. You can learn more about the box-shadow property @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)

```css
.clock {
    border:20px solid white;
    border-radius:50%;
    box-shadow:
    0 0 0 4px rgba(0,0,0,0.1),
    inset 0 0 0 3px #EFEFEF,
    inset 0 0 10px black,
    0 0 10px rgba(0,0,0,0.2);
}
```

`div.clock-face` is the container which holds the three hands. The height of each hand is 6px, so to account for it the container is moved up by 3px.

```css
.clock-face {
    transform: translateY(-3px);
}
```

```css
.hand {
    /* 50% width of div.clock-face */
    width:50%;
    height:6px;

    /* places it in between (the clock-face's translateY(-3px) takes care of the offset) */
    position: absolute;
    top:50%;

    transform-origin: 100%;
    transform: rotate(90deg);
    transition: all 0.05s;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
}
```

The `transform-origin` gives the point at which the rotation transform is to take place - default would be at the center of the hand, but we want it to rotate around the right endpoint. Setting `transform-origin: 100%` does this. 

The hands by default are at `0deg` which is horizontal, we set the transform to `rotate(90deg)` to set them all in a vertical position - `12:00:00`. The `transition` and `transition-timing-function` give the animated effect when changing the angle of the hands.

Now the javascript bits! We can break it down into the following steps - 

1. Get the current time
2. Extract the hours, minutes and seconds
3. Map the hours, minutes and seconds to corresponding degrees of the hands
4. Update the hands' `transform`

Now the whole loop should run every second, let's abstract the update logic in the `setDate()` function

```js

//get reference to the hands
const secondHand = document.querySelector('.second-hand')
const minuteHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')

function setDate(){
  //logic to update the clock
}

setInterval(setDate, 1000)
```

Now all the logic that goes into the `setDate()`

### Get the current time

```js
const now = new Date()
```

### Extract the current sec, min, hour

```js
const seconds = now.getSeconds()
const mins = now.getMinutes()
const hours = now.getHours()
```

### Map the time to degrees of the corresponding hands

```js
const secondsDegrees = ((seconds / 60) * 360) + 90;
const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
const hoursDegrees = ((hours / 12) * 360) + ((mins/60)*30) + 90;
```

Here the 90 represents 90 degrees that is to be added to set the hands to 12 O'clock (which by default they point to 9 O'clock). Rest is simple mapping from one range to another.

### Update the hand positions

```js
secondHand.style.transform = `rotate(${secondsDegrees}deg)`
minuteHand.style.transform = `rotate(${minsDegrees}deg)`
hourHand.style.transform = `rotate(${hoursDegrees}deg)`
```

That is pretty much it! Put it all together and you get the finished version of the clock. The codepen with the final code below -

<iframe height='524' scrolling='no' title='JS30-02-clock-b' src='//codepen.io/deepakkarki/embed/VdzxWb/?height=524&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/VdzxWb/'>JS30-02-clock-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Note I've added the following style to make the min and hour hands separate lengths,

```css
.min-hand {
  width: 35%;
  margin-left: 15%;
}

.hour-hand {
  width: 20%;
  margin-left: 30%;
}
```