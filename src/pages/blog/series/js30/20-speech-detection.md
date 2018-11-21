---
layout: post
title: Speech Detection
desc: >
  This is the 20th project of Wes Bos's JS30 series. Today we learn how to use the built in Speech Recognition in the browser. Text to speech in realtime.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 20
---


This is the 20th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Today we learn how to use the built in Speech Recognition in the browser. Text to speech in realtime.

Video - 

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/0mJC0A72Fnw' frameborder='0' allowfullscreen></iframe></div>

The starter files -

<iframe height='465' scrolling='no' title='JS30-20-speech-a' src='//codepen.io/deepakkarki/embed/vrzKBY/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/vrzKBY/'>JS30-20-speech-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

What we have to do is understand the speech in real time using the speech recognition API, and once the user has finished speaking a sentence (rather pauses the speech), append a `<p>` tag to the `div.words` and start listening for the next time the user speaks.


The JS we have 

```js
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
```

The SpeechRecognition interface of the Web Speech API is the controller interface for the recognition service; this also handles the SpeechRecognitionEvent sent from the recognition service. This is still an experimental technology. In chrome you need `window.webkitSpeechRecognition`.

Create the speech recognition object, set the language. Controls whether interim results should be returned (true) or not (false.) Interim results are results that are not yet final. Setting it to true gives the whole app a realtime feel (i.e. text appears as you speak)

```js
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
```

Append a paragraph to the `div.words`, this is where the converted text goes initially.

```js
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
```

Now we add the event handler to get notified of results. The `onresult` property of the SpeechRecognition interface represents an event handler that will run when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app (when the result event fires). 

Since we've set `recognition.interimResults = true`, we'll get a bunch if intermediate values as well (we'll be updating the screen on intermediate values as well to give a realtime feel). The result of the last event generated will have an `isFinal` property which will determine the final result we see on screen. 

```js
recognition.addEventListener('result', e => {
    console.log(e)
  });
```

The event `e` is of type `SpeechRecognitionEvent`. The `e.results` property is a `SpeechRecognitionResultList` object. The `SpeechRecognitionResultList` contains `SpeechRecognitionResult` objects. `e.results` can be accessed like an array. The `r.results[0]` returns the `SpeechRecognitionResult` at position 0. 

Each `SpeechRecognitionResult` object contains a list of `SpeechRecognitionAlternative` objects that contain individual results. Each `SpeechRecognitionResult` can also be accessed like arrays. So `e.result[0][0]` returns the `SpeechRecognitionAlternative` at position 0 of the `SpeechRecognitionResult` at position 0 of the `SpeechRecognitionResultList` (viz `e.results`). We then return the transcript property of the SpeechRecognitionAlternative object. What we want is `e.result[0][0].transcript`. 

I know it's a bit confusing, but this is how it is! You can learn more about speech recognition @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).


So now filling in the event listener correctly -

```js
recognition.addEventListener('result', e => {
    const transcript = e.results[0][0].transcript

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
});
```

If the first `SpeechRecognitionResult` has a `isFinal` property set to true, then we understand that it the user has stopped speaking and the API is done translating. We create a new `<p>` element and add it to the `div.words`. Anything spoken after now goes into the new paragraph.


Finally we start the speech recognition on page load

```js
recognition.start();
recognition.addEventListener('end', recognition.start);
```

`recognition.start()` Starts the speech recognition service listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition. Once the user pauses and the API finishes converting speech to text, a `end` event is triggered on the recognition object. We pass `recognition.start` to ask the browser to start listening again (otherwise the browser stops listening, and speech to text happens only once).


That is all for this small experiment. Final code -

<p data-height="465" data-theme-id="dark" data-slug-hash="LrJRzy" data-default-tab="js,result" data-user="deepakkarki" data-embed-version="2" data-pen-title="JS30-20-speech-b" class="codepen">See the Pen <a href="https://codepen.io/deepakkarki/pen/LrJRzy/">JS30-20-speech-b</a> by Deepak Karki (<a href="https://codepen.io/deepakkarki">@deepakkarki</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
