---
layout: post
title: Countdown timer
desc: >
  This is the 29th project of Wes Bos's JS30 series. Today we'll build a custom JavaScript countdown timer from scratch.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-04
part: 29
---


This is the 29th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Today we'll build a custom JavaScript countdown timer from scratch.

Video -

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/LAaf7-WuJJQ' frameborder='0' allowfullscreen></iframe></div>

Starter code -

<iframe height='460' scrolling='no' title='JS30-29-timer-a' src='//codepen.io/deepakkarki/embed/JZeLBw/?height=360&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/JZeLBw/'>JS30-29-timer-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

All the HTML and CSS is already given to us,

```html
<div class="timer">
  <div class="timer__controls">
    <button data-time="20" class="timer__button">20 Secs</button>
    ...
    <form name="customForm" id="custom">
      <input type="text" name="minutes" placeholder="Enter Minutes">
    </form>
  </div>
  <div class="display">
    <h1 class="display__time-left"></h1>
    <p class="display__end-time"></p>
  </div>
</div>
```

This is the HTML display, `div.timer__controls` holds all the buttons and the form for custom entering the minutes. The `data-time` attribute hold the time in seconds that the corresponding button sets.

`h1.display__time-left` is the countdown display, `p.display__end-time` displays the end time when the count down will run out.


------

We may be initially tempted to just use `setInterval()` and update the countdown, it'll work in most cases, but it isn't reliable. If the browser is minimized or if there are other computation heavy function blocking the event loop, the interval callback may not be called to the second. Hence we take a different approach. We'll have the callback check the remaining time by comparing to the current time.

```js
//handles to displays and controls
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown; // this is the ret value if setInterval

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  // convert seconds to mili seconds
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop the countdown
    if(secondsLeft < 0) clearInterval(countdown);
    // else display secondsLeft
    else displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  //display logic
}
```

Well we did quite a few things here, lets see what we have!

The `timer(sec)` function sets a timer for `sec` seconds. `now` is the time (in mili seconds) the timer is being set, `then` is the time when the timer will run out. 

We have a `setInterval` which is supposed to run every second, even if the callback is missed, no issues since we're calculating the seconds left using the final time `then` and the time the callback runs. That's how we get `secondsLeft = Math.round((then - Date.now()) / 1000)`

We call `displayTimeLeft` with the initial number of seconds in `timer()`, then it is called in the `setInterval` callback to display `secondsLeft`.

Once the `secondsLeft` gets lesser than zero, the interval is cleared.


Now for the seconds left display logic -

```js
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
```

From the seconds, extract the whole minutes, then find the reminder seconds. In the display we check if `remainderSeconds` is a single digit, if so we pad it with a extra '0'. We then update the `h1.display__time-left` and the title of the page with `display`. The title of the page is displayed in the browser tab area.


Now to display the end time (just under the count down timer display). 


```js
// in timer()
displayEndTime(then)

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  const adjustedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`
  endTime.textContent = `Be Back At ${adjustedHour}:${adjustedMinutes}`;
}
```
`displayEndTime(endTime)` gets the end time in ms as a parameter. We extract the hour, convert it to 12 hour format. Get the minutes, again if it is in single digits, pad it with an extra zero. Display the result in `p.display__end-time`


Now to get the user input to set the timer.

For each of the buttons we get the necessary time from `data-time` attribute and make a call to `timer()`. This is very straightforward.

```js
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
```

The form component is a bit more involved. We listen to when the user 'submits' the form, i.e. type the number and press enter.

```js
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
```

We prevent the default action, get the value (represents minutes) from the text input and then call the timer. We then reset the form to empty the text field.


This completes our count down timer project, here is the final code -

<iframe height='435' scrolling='no' title='JS30-29-timer-b' src='//codepen.io/deepakkarki/embed/EROeQq/?height=435&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/EROeQq/'>JS30-29-timer-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>