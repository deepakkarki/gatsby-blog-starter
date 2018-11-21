---
layout: post
title: Key sequence detection
desc: >
  This is the 12th project of Wes Bos's JS30 series. We'll be building a key sequence detector.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 12
---


This is the 12th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We'll be building a key sequence detector.

Here is the video 

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/_A5eVOIqGLU' frameborder='0' allowfullscreen></iframe></div>

There is pretty much no starter file, this project is a simple JS function. The idea is to trigger an action when a particular key sequence is pressed. The initial idea comes form the "Konami code" (Up, Up, Down, Down, Left, Right, Left, Right, B, A) which enabled various cheats in retro games.

Steps :

1. Store the code, get the length of the code (`n`)
2. Have an array that records the last `n` keys pressed
3. When the characters in the array matches the secret code, trigger the action

```js
//this is the array
const pressed = []

//the secret code
const secretCode = 'yolo'

window.addEventListener('keyup', (e) => {
  // e.key is the key is the key pressed, add it to the array
  pressed.push(e.key);

  // cut the array to the size of secretCode.length from the end of the array
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

  //convert array into string, see if it is the secretCode
  if (pressed.join('').includes(secretCode)) {
    //take action
    cornify_add();
  }
});
```

So that's pretty much it! Hopefully the comments in the code makes it obvious. [cornify.js](http://www.cornify.com/) is a library that adds unicorns and rainbows to your webpage!

Here is the end result! Try typing 'yolo' and see what happens!

<iframe height='421' scrolling='no' title='JS30-12-key-sequence' src='//codepen.io/deepakkarki/embed/LrdBBO/?height=421&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/LrdBBO/'>JS30-12-key-sequence</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
