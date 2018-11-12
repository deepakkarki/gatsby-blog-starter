---
layout: post
title: Fun with HTML5 canvas
desc: >
  This is the eighth project of WesBos's JS30 series. We will be creating a drawing canvas.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
---


This is the eighth project of WesBos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We will be creating a drawing canvas as seen below!

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/8ZGAzJ0drl0' frameborder='0' allowfullscreen></iframe></div>

You can find the minimal starter code below -

<iframe height='465' scrolling='no' title='JS30-08-html-canvas-a' src='//codepen.io/deepakkarki/embed/GGQObb/?height=265&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/GGQObb/'>JS30-08-html-canvas-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

As you can see we've got nothing more than a simple canvas element! That is because all the magic happens in the JS bits we're going to code.

You can learn more about the `<canvas/>` element and the API on [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

There is also a fully blow out [tutorial series](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage) for those who wish to dig deeper.

So let's get started. There are multiple things we need to do in order to obtain our end result.

0. Initialization - get a handle to the canvas, set basic settings
1. Track the user input
2. Draw lines on the canvas
3. Change the color of the line
4. Change the thickness of the line


## Initialization

The handle to manipulate the canvas is `ctx`, the 2D context of the canvas. You have a 3D context for drawing 3D objects.

```js
const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')
```

The canvas width and height are set to that of the whole window

```js
canvas.width = window.innerWidth
canvas.height = window.innerHeight
```

Think of the canvas element like a piece of canvas (duh!) which you can draw and paint on. `ctx.strokeStyle` sets the color to use, and `ctx.lineWidth` sets the width of the line. `ctx.lineJoin` property determines how two connecting segments (of lines, arcs or curves) in a shape are joined together, `ctx.lineCap` property determines how the end points of every line are drawn (three possible values for this property and those are: butt, round and square).

Learn more about [strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle), [lineJoin](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin), [lineCap](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap), [lineWidth](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)

```js
ctx.strokeStyle = 'blue'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 10
```


## Track user interactions

We need to know when the user has actually clicked on the canvas and is dragging the cursor. For this purpose we'll have a `isDrawing` variable.

```js
let isDrawing = false

function draw(e){
  if(!isDrawing) return;

  //rest of the logic in here
}

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', ()=> isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```

So we've done a bunch of things here! The `draw()` function is what actually does the drawing on a `mousemove` event on the canvas, but only if `isDrawing` is true. Now `isDrawing` is set to true when there is a `mousedown` event on the canvas (i.e. we click on the canvas). When we unclick the mouse (`mouseup`) or when we leave the canvas area (`mouseout`), then `isDrawing` is set to false again.


## Drawing lines on the canvas


Here is how drawing a line on the canvas works, let's say you want to draw a line from `(10,10)` to `(50,50)`

```js
ctx.moveTo(10, 10)
ctx.lineTo(50, 50)
ctx.stroke()
```

You start drawing by moving to the point of the desired location (`ctx.moveTo(10, 10)`) and then draw the line to the desired destination (`ctx.lineTo(50, 50)`). But until this point nothing is really drawn on the canvas. The drawing happens only after you call `ctx.stroke()`.

Now when the user moves over the canvas with the mouse, a stream of `mousemove` events are triggered and `draw(e)` is called (`e` having the event data). `(e.offsetX, e.offsetY)` have the (x,y) coordinates of the mouse wrt to canvas. These events matter only if `isDrawing` is true.

Now to draw lines we need a start position (where the user has clicked), and `lineTo()` the new position and an immediate `stroke()`. So as we're dragging our mouse while clicking we leave a trail. 

The following code moves the drawing position to where the user has clicked.

```js
//modifying the mousedown event listener
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true
  ctx.moveTo(e.offsetX, e.offsetY)
});
```

The `draw()` function has now been modified to draw the line. 
The call to `ctx.lineTo()` also updates the drawing position to where the line was drawn (i.e. `(e.offsetX, e.offsetY)`)

```js
function draw(e){
  if(!isDrawing) return;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}
```

At this point we have a simple drawing canvas! You can see the results below -

<iframe height='413' scrolling='no' title='JS30-08-html-canvas-b' src='//codepen.io/deepakkarki/embed/aKqQGL/?height=413&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/aKqQGL/'>JS30-08-html-canvas-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


Now for the finishing touches! We need to change both the width of the strokes and the color as the user drags on.

## Change the color of the line

This can be done by changing the `strokeStyle` incrementally inside the `draw()` function. We'll be setting the color in HSL format, that way we can change the color across the RGB spectrum just by adjusting the hue factor.

```js
let hue = 0

function draw(e){

  // draw line

  // change color
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  hue = ++hue % 360;
}
```


## Change the thickness of the line

```js
let widthDelta = 1

function draw(e){
  // draw line ...
  // change color ...

  // change width
  ctx.lineWidth += widthDelta
  if(ctx.lineWidth < 10 || ctx.lineWidth > 100){
    widthDelta = -widthDelta
  }

}
```

The final code is here -

<iframe height='455' scrolling='no' title='JS30-08-html-canvas-c' src='//codepen.io/deepakkarki/embed/vrdvdY/?height=415&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/vrdvdY/'>JS30-08-html-canvas-c</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

As you can see, the final code is slightly different from WesBos's code! The difference in the output line being slightly "dotted" (not a smooth one). This is because Wes used a `lastX` and `lastY` variable to store the latest position, I relied on the fact that drawing position would update automatically to `(x,y)` after a call to `lineTo(x,y)` was made. The line was smooth before I added `ctx.beginPath()` to `draw()` (see the above codepen). But then the color and the width of the lines already drawn would also change, hence I needed to add `ctx.beginPath()`. This in turn makes my line dotted whenever the cursor is dragged quickly! (Try removing line 19  `ctx.beginPath()` in the codepen and see what happens!)

Anyway, I found this observation interesting so I let it be! Here is the final one which works like Wes' does!

<iframe height='454' scrolling='no' title='JS30-08-html-canvas-d' src='//codepen.io/deepakkarki/embed/wXyNmj/?height=414&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/wXyNmj/'>JS30-08-html-canvas-d</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

