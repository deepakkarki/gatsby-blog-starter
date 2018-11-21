---
layout: post
title: Custom video player
desc: >
  This is the eleventh project of Wes Bos's JS30 series. We'll be building our own custom HTML5 video player.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 11
---


This is the eleventh project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We'll be building our own custom video player.

Here is the video 

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/yx-HYerClEA' frameborder='0' allowfullscreen></iframe></div>

And here are the starter files

<iframe height='458' scrolling='no' title='JS30-11-video-player-a' src='//codepen.io/deepakkarki/embed/EREbrX/?height=398&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/EREbrX/'>JS30-11-video-player-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


Again, in this project we won't be touching the HTML or CSS, but we need to understand the html structure.

```html
<div class="player">
     <video class="player__video viewer" src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"></video>

     <div class="player__controls">
       <div class="progress">
        <div class="progress__filled"></div>
       </div>
       <button class="player__button toggle" title="Toggle Play">►</button>
       <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
       <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
       <button data-skip="-10" class="player__button">« 10s</button>
       <button data-skip="25" class="player__button">25s »</button>
     </div>
   </div>
```

The player is contained in `div.player`, the video comes from the `<video>` element, the controls are under `div.player__controls`. The animation you see when hovering on the video is a combination of CSS transition and transform.

----

**Features of the player include** - play/pause the video, skip forward/backward, adjust speed, adjust volume, display progress and seek position in video.

Main steps involved in creating the player :

1. Get a reference to all the elements we need to control
2. Write a function to play/pause
3. Update the play/pause button based on state of video
4. Add the skip forward and backward functionality
5. Handle the volume change
6. Handle the playback speed range
7. Display the video progress
8. Seek a position in the video by clicking/dragging on the progress bar


## Get all the elements

```js
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

You can read more about the [video element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) or preferably the [Media element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) it inherits from. We'll be using the JS properties quite a bit. If you also fancy a tutorial about the video element [html5rocks](https://www.html5rocks.com/en/tutorials/video/basics/) has a brilliant one!


## Write a function to play/pause

```js
function togglePlay() {
  if(video.paused) video.play();
  else video.pause();
}

// You can toggle either by clicking the video or the play/pause button
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```

This function checks if the video is paused, if so it starts playing it, if not it pauses the playing video. For all the properties and function relating to the video element, please refer to the links to the docs/tutorials I've mentioned above.


## Update the play/pause button

```js
function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
```

The video can be paused / played by other means than clicking on the video / toggle button. So instead of adding the logic in the `togglePlay` we'll listen to the 'play' and 'pause' events on the video element.


## Add the skip forward and backward functionality

```js
function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip));
```

We can change the video time by assigning the new time to `video.currentTime`. The skip time is got from the `data-skip` attribute. So you can go `-10` seconds back in time or skip `25` seconds ahead.


## Handle the volume and playback rate change

```js
function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
```

Here we exploit the fact that both volume and range playback are slider elements. `video.volume` and `video.playbackRate` control the volume and playback speed respectively. The elements name coincides with the property of the video object.

```html
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```

Hence we can just use `video[this.name]`, it will resolve to either `video.volume` or `video.playbackRate` based on which element we're sliding. Assigning to `this.value` remains same anyway. This way we don't have to duplicate the code!


## Display the video progress

```js
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);
```

The yellow bar shows the % of the video that has completed. We attach a 'timeupdate' event listener to the video element, every time it fires the percent is calculated and the progressBar's CSS `flexBasis` property is set!


## Seek a position in the video

```js
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);
```

We get from the click event the relative position where the mouse was clicked, then calculate the % width and get the `scrubTime` from that. 

Now to enable dragging as well

```js
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```

If the mouse is down and we move the mouse over the progress bar, scrub is triggered and the target position is seeked!


-----


That is all for making your own minimalistic custom video player! Here is the final code

<iframe height='473' scrolling='no' title='JS30-11-video-player-a' src='//codepen.io/deepakkarki/embed/gKeKLg/?height=373&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/gKeKLg/'>JS30-11-video-player-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>