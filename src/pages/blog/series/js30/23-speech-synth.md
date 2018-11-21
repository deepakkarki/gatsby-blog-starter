---
layout: post
title: Speech Synthesis
desc: >
  This is the 23rd project of Wes Bos's JS30 series. Today we'll learn how to do speech synthesis (text to speech) with JavaScript.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-04
part: 23
---


This is the 23rd project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Today we'll learn how to do speech synthesis (text to speech) with JavaScript.

Video - 

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/saCpKH_xdgs' frameborder='0' allowfullscreen></iframe></div>

Starter Code -

<iframe height='474' scrolling='no' title='JS30-23-SpeechSynthesis-a' src='//codepen.io/deepakkarki/embed/GGXwyq/?height=474&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/GGXwyq/'>JS30-23-SpeechSynthesis-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


Speech synthesis is one half of the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), the other being the speech recognition API we dealt with earlier.
Speech synthesis is accessed via the `SpeechSynthesis` interface, a text-to-speech component that allows programs to read out their text content (normally via the device's default speech synthesizer.) Different voice types are represented by `SpeechSynthesisVoice` objects, and different parts of text that you want to be spoken are represented by `SpeechSynthesisUtterance` objects. You can get these spoken by passing them to the `SpeechSynthesis.speak()` method.

What we already have -

```js
const msg = new SpeechSynthesisUtterance()
let voices = []
const voicesDropdown = document.querySelector('[name="voice"]')
const options = document.querySelectorAll('[type="range"], [name="text"]')
const speakButton = document.querySelector('#speak')
const stopButton = document.querySelector('#stop')
```

We have handles to the various DOM elements, and we have msg - a [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) object.

The `SpeechSynthesisUtterance` represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.) The `SpeechSynthesisUtterance` object has various properties that can be set, to manipulate the speech generated.

* `.lang` - Gets and sets the language of the utterance.
* `.pitch` - Gets and sets the pitch at which the utterance will be spoken at.
* `.rate`- Gets and sets the speed at which the utterance will be spoken at.
* `.text` - Gets and sets the text that will be synthesized when the utterance is spoken.
* `.voice` - Gets and sets the voice that will be used to speak the utterance.
* `.volume` - Gets and sets the volume that the utterance will be spoken at.

This is the most basic thing you need to do to generate speech -

```js
const msg = new SpeechSynthesisUtterance()

// .text should be set, all other properties have defaults
msg.text = "Hello There"

// speak() does the actual synthesis - uses default voice
speechSynthesis.speak(msg)
```

-------

Now for the various features of our app!


## Get the default text

We want the app to speak whatever text we have in the text area, so lets set the initial value of the msg text to that.

```js
msg.text = document.querySelector('[name="text"]').value
```


## Select a custom voice

Setting the voice property - we use `voiceschanged` event to listen to when all the voices have been loaded.

```js
function populateVoices(){
  // array of SpeechSynthesisVoice objects
  voices = this.getVoices()
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('')
}
speechSynthesis.addEventListener('voiceschanged', populateVoices)
```

We get the voices from the `speechSynthesis` object, then filter only those which are english. Then create option tags (as strings) and add them to the `innerHTML` of the select component.

Now when the user selects the voice, we want to change the utterance to use that,

```js
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value)
}
voicesDropdown.addEventListener('change', setVoice)
```

We search through the array of voices to find the correct `SpeechSynthesisVoice`. We then set the `msg.voice` to that object.

```js
// A example SpeechSynthesisVoice object
{ 
  default:true, lang:"en-IN",
  localService:true, name:"Veena",
  voiceURI:"Veena"
}
```


## Rate, pitch, user entered text

Our `options` variable is a NodeList of three elements, the rate, pitch `range` elements and the text area.
We can deal with all three inputs in one function

```js
const options = document.querySelectorAll('[type="range"], [name="text"]')

function setOption() {
  msg[this.name] = this.value
}

options.forEach(option => option.addEventListener('change', setOption))
```

The name of each of the input elements match with the corresponding property name in `msg`, and the value can be extracted in the same way using `this.value`. 


## Start and stop the speech

We have a start and stop button already, let us write a function to be triggered on click

```js
function toggle(startOver = true) {
  speechSynthesis.cancel()
  if (startOver) {
    speechSynthesis.speak(msg)
  }
}
speakButton.addEventListener('click', toggle)
stopButton.addEventListener('click', () => toggle(false))
```

`toggle()` cancels anything that is already playing, and in case `startOver` is true (viz the default case), then it replays the current text with the current settings. `startOver` is set to false in the stop button, so it doesn't start playing anything after is cancels the current speech.

We'll also use toggle in `setOption` to re-start the speech after a change in settings.

```js
function setOption() {
  msg[this.name] = this.value
  toggle()
}
```

This completes our tiny app, here is the final code -

<iframe height='465' scrolling='no' title='JS30-23-SpeechSynthesis-b' src='//codepen.io/deepakkarki/embed/aKaQEx/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/aKaQEx/'>JS30-23-SpeechSynthesis-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>