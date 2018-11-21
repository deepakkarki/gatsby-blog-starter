---
layout: post
title: Follow along link highlight
desc: >
  This is the 22nd project of Wes Bos's JS30 series. Today we learn how to make cool follow along link highlights in JavaScript.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-04
part: 22
---


This is the 22nd project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Today we learn how to make cool follow along link highlights in JavaScript.

Video - 


<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/POP_qri7RA8' frameborder='0' allowfullscreen></iframe></div>

Codepen -

<iframe height='444' scrolling='no' title='JS30-22-LinkHighlight-a' src='//codepen.io/deepakkarki/embed/OEoBRY/?height=444&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/OEoBRY/'>JS30-22-LinkHighlight-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

We have a menu and some junk html with links interspersed. The idea is to create an highlight that moves from one link to another on hover, in a smooth animated fashion.

We'll achieve the highlight with an underlying `span.highlight` element. The CSS for this is already given, it contains the transition property for animation effect -

```css
.highlight {
  transition: all 0.2s;
  border-bottom:2px solid white;
  position: absolute;
  top:0;
  background:white;
  left:0;
  z-index: -1;
  border-radius:20px;
  display: block;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
```

Adding the element via JS

```js
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.appendChild(highlight)
```

This creates an span element and adds the class 'highlight' to it. Then appends the element to the end of the document body.


Now to figure when there is an hover 

```js
const triggers = document.querySelectorAll('a');
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
function highlightLink() {
}
```

In `highlightLink()` we need to move the span element exactly over the link we're hovering on. Due to `z-index: -1` on the highlight element, it moves under the link.

To find the position and dimensions of the link, we'll use `getBoundingClientRect()`. This method returns the size of an element and its position relative to the viewport. The returned value is a `DOMRect` object. The result is the smallest rectangle which contains the entire element, with left, top, right, bottom, x, y, width, and height properties describing the overall border-box in pixels. Properties other than width and height are relative to the top-left of the viewport.

Learn more @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Key thing to note here is that the top, left, right, bottom are all relative to the viewport.

```js
function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  console.log(linkCoords);
  const coords = {
    //width and height are absolute
    width: linkCoords.width,
    height: linkCoords.height,
    
    // we need to add scroll since 
    //top,left are relative to the viewport
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  };

  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}
```

We extract the dimensions and position of the link element we're hovering over and set the style of the highlight element to those dimensions and move it to that position. Since there is already a `transition: all 0.2s` set in highlight's CSS, the change will appear animated.

Here is the final code -

<iframe height='458' scrolling='no' title='JS30-22-LinkHighlight-b' src='//codepen.io/deepakkarki/embed/VdGVmZ/?height=388&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/VdGVmZ/'>JS30-22-LinkHighlight-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>