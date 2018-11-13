---
layout: post
title: Drum kit
desc: > 
  This is the first project of Wes Bos's JS30 series. We will be building a "drumkit" as shown in the first two minutes of the video below. The page plays certain sound effects on pressing keys from A to L on the qwerty keyboard.
author:
  name: "Deepak Karki"
published: true
date: 2018-10-02
categories: ["js", "frontend", "design"]
---

This is the first project of Wes Bos's [JS30 series](https://JavaScript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../).
We will be building a "drumkit" as shown in the first two minutes of the video below. The page plays certain sound effects on pressing keys from A to L on the qwerty keyboard.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/VuN8qwZoego' frameborder='0' allowfullscreen></iframe></div>

Here is a codepen with the starter files (I have made *slight* modifications to the pens since it's not running on the local filesystem) :

<iframe height='492' scrolling='no' title='JS30-01-DrumKit-a' src='//codepen.io/deepakkarki/embed/jKmvXW/?height=492&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/jKmvXW/'>JS30-01-DrumKit-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Let's have a look at the HTML content. The structure is rather simple - the main content is in the `div.keys` tag which contains the all the `div.key` elements. 

```html
<div class="keys">
    <div data-key="65" class="key">
      <kbd>A</kbd>
      <span class="sound">clap</span>
    </div>
    <div data-key="83" class="key">
      <kbd>S</kbd>
      <span class="sound">hihat</span>
    </div>
    ...
</div>
```

The `div.key` element displays the letter and corresponding sound beat. The key get's animated when the corresponding key is pressed on the keyboard. The `<kbd>` tag is essentially a span which is supposed to signify "user input from a keyboard, voice input, or any other text entry device", it's more to do with semantics than anything else! You can read more about it on the [MDN docs page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd).

The next part is the `<audio>` tags, these contain the links to the audio files that are to be played on the correct key presses.

```html
<audio data-key="65" src="sounds/clap.wav"></audio>
<audio data-key="83" src="sounds/hihat.wav"></audio>
<audio data-key="68" src="sounds/kick.wav"></audio>
  ...
<audio data-key="76" src="sounds/tink.wav"></audio>
```

```
The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream. The `<audio>` tag does not render unless there is a `controls` attribute present.
```

Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).


The `data-key` properties you see are custom attributes which you can add to HTML elements. The general format is `data-*`. This allows us to associate custom data to HTML elements (without colliding with standard attributes) in a way it can be accessed by CSS selectors and programmatically via javascript.

```
HTML5 is designed with extensibility in mind for data that should be associated with a particular element but need not have any defined meaning. data-* attributes allow us to store extra information on standard, semantic HTML elements without other hacks such as non-standard attributes, extra properties on DOM, or Node.setUserData().
```

Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).


The CSS is pretty straightforward, here are the interesting bits

```css
.keys {/*
  set display to flex
  cover the whole viewport height
  // okay - not really interesting
*/}

.key {
  /*  evenly spaced flex items */
  transition: all .07s ease;
}

.playing {
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}
```

These main properties involved with the animation - the `transition` on the `key` class, and the `playing` class that does the transform. More about this later.

So this is what comes with the template, we have to write the javascript bits to get to the finished webpage.

We can brake the problem into three parts - 
1. Capture the keystrokes - only letters from 'A' to 'L' on the qwerty keyboard, ignore the rest.
2. Play the corresponding sound on a valid keypress.
3. Animate the `div.key` element that corresponds to the letter pressed.

## Capture the keystrokes

We can capture keystrokes by adding a `keydown` event listener to the window object.

```js
window.addEventListener('keydown', function(e){
    // e is the event object
    console.log(e.keyCode)
})
```

## Play the audio

The event object has a keycode integer, which is the ascii value of the key pressed. This is where the `data-*` property becomes useful, we can select the elements based on keycode.

```js
function playSound(e){
  // selects the audio element where data-key="e.keyCode"
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)

  //if there is no audio element with the corresponding keyCode, then don't do anything
  if(!audio) return;

  //else reset the audio time and play it
  audio.currentTime = 0
  audio.play()
}

window.addEventListener('keydown', playSound)
```

Selecting the `<audio>` element gives us an object of type `HTMLAudioElement` which has access to the properties of <audio> elements, as well as methods to manipulate them. `.play()` plays the audio file associated with the tag. `.currentTime = 0` resets the audio time if it's already running, otherwise if you hold down a button, the audio wouldn't be played repeatedly because an previous instance is already playing.

Learn more about the audio tag @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)

Here is the codepen up to this point -

<iframe height='494' scrolling='no' title='JS30-01-DrumKit-b' src='//codepen.io/deepakkarki/embed/bKRdGd/?height=434&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/bKRdGd/'>JS30-01-DrumKit-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## Animate the keys

The animation is done via CSS transitions. In the JS code we just add and remove the class `playing` to create the animation.

```js
// will go in the playSound() function
const key = document.querySelector(`div[data-key="${e.keyCode}"]`)
key.classList.add('playing')
```

If we recall, the transitions take `0.07` seconds. We want to remove the class `playing` right after the animation completes. Rather than hardcoding it as `0.07` seconds in the code, we can just listen on the `transitionend` event to be triggered on the element. Let's create a function `removeTransition` to take care of this logic.

```js
function removeTransition(e){
  //transitionend is triggered on a variety of properties, (border, box shadow, etc)
  // just select one - in this case 'transform'
  if(e.propertyName != 'transform') return;
  e.target.classList.remove('playing')
}

const keys = document.querySelectorAll(".key")
keys.forEach(key => key.addEventListener('transitionend', removeTransition))
```

This completes this project, here is the final codepen -

<iframe height='495' scrolling='no' title='JS30-01-DrumKit-c' src='//codepen.io/deepakkarki/embed/KeqBGG/?height=415&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/KeqBGG/'>JS30-01-DrumKit-c</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
