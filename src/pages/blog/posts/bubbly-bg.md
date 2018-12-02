---
layout: post
title: Bubbly-bg
desc: > 
  This is a source code walkthrough of Bubbly-bg - a tiny dependency free library to get beautiful animated bubbly backgrounds for your webpages.
author:
  name: "Deepak Karki"
published: true
date: 2018-11-24
categories: ["frontend", "software-architecture", "javascript"]
---


This is a source code walkthrough of Bubbly-bg - a tiny js library to get beautiful animated bubbly backgrounds for your webpages.

# What 

[Bubbly-bg](https://github.com/tipsy/bubbly-bg/) is a small independent library written in vanilla javascript that helps you add an animated “bubbly background”  to your HTML webpages. A live demo can be found here https://tipsy.github.io/bubbly-bg/


## Usage

It is extremely simple to use, just include the script from a CDN and call the function `bubbly()` 

```html
<body>
    ...
    <script src="https://cdn.jsdelivr.net/npm/bubbly-bg@0.2.3/dist/bubbly-bg.js">
    </script>
    <script> bubbly(); </script>
</body>
```

Or if you want to integrate it into your build process, you can  `npm install bubbly-bg`

Calling `bubbly()` by default will create a blue bubble background. You can configure it to your needs by passing an options object while calling the `bubbly()` function. Sample settings below -

```js
bubbly({
    animate: false, // default is true
    blur: 1, // default is 4
    bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`, // default is () => `hsla(0, 0%, 100%, ${r() * 0.1})`)
    bubbles: 100, // default is Math.floor((canvas.width + canvas.height) * 0.02);
    canvas: document.querySelector("#background"), // default is created and attached
    colorStart: "#4c004c", // default is blue-ish
    colorStop: "#1a001a",// default is blue-ish
    compose: "lighter", // default is "lighter"
    shadowColor: "#0ff", // default is #fff
});
```



<iframe height='456' scrolling='no' title='Bubbly-bg demo' src='//codepen.io/deepakkarki/embed/QmPvJP/?height=456&theme-id=0&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; margin-top:20px'>See the Pen <a href='https://codepen.io/deepakkarki/pen/QmPvJP/'>Bubbly-bg demo</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


# Why

Animated backgrounds can give wonderful visual effects, but repeating yourself and taking care of edge cases can be quite an hassle. Hence the need for something like `bubbly-bg.js`  - a configurable, lightweight, dependency free JS library!


# How it works

Behind the scenes when `bubbly()`  is called it attaches a [\<canvas/>](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)  element to the body. This canvas element covers the whole webpage. It has

-  `position:fixed` - which fixes the position of the canvas w.r.t. the window.
-  `top:0px, left:0px` - edge to edge
-  `min-width:100vw; min-height:100vh` - so that it covers the whole viewport.

If the user has provided a target canvas element in the options parameter, that is used instead. Once the canvas element has been selected, all the animation is carried out there! 

The [src/bubbly-bg.js](https://github.com/tipsy/bubbly-bg/blob/master/src/bubbly-bg.js) file contains all the necessary logic.  **You can follow the** [**source code here**](https://github.com/tipsy/bubbly-bg/blob/master/src/bubbly-bg.js).

The bubbly function is attached to the window object to be accessible globally. The function accepts one config object.


    window.bubbly = function(config){ /*logic goes here*/ }

Initial config 

```js
const c = config || {};
const r = () => Math.random();
const canvas = c.canvas || document.createElement("canvas");
let width = canvas.width;
let height = canvas.height;
```

If no config from the user is passed, an empty obj is assigned to ‘c’. If no canvas was pointed to by the user, a new canvas element is created.

If we’ve provided a pre-existing canvas element, it would naturally have a parent, if not the canvas element is the one we’ve created. The following code fragment initializes the canvas element in case we have created it. 

```js
if (canvas.parentNode === null) {
    canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
}
```

Note that assigning the width and height are important, else the canvas retains the default size of `300x150` and the image is then stretched to the viewport size, which makes the whole background blurry.

Next the canvas is setup. Here the `shadowColor` and `shadowBlur` are set to their default values if the user has not chosen any option, a gradient is created throughout the canvas starting from the top left `(0,0)` till the bottom right `(width, height)`. The starting and ending color default to `#2AE, #17B` respectively if the user does not select the colors. 

```js
const context = canvas.getContext("2d");
context.shadowColor = c.shadowColor || "#fff";
context.shadowBlur = c.blur || 4;
const gradient = context.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, c.colorStart || "#2AE");
gradient.addColorStop(1, c.colorStop || "#17B");
```

The bubbles to display/animate are created and added to a bubbles array. If the user hasn’t provided the number of bubbles, `Math.floor((width + height) * 0.02)` number of bubbles are created. A bubble is represented as a javascript object.

```js
const nrBubbles = c.bubbles || Math.floor((width + height) * 0.02);
const bubbles = [];
for (let i = 0; i < nrBubbles; i++) {
    bubbles.push({
        f: (c.bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call(),
        x: r() * width, // x-position
        y: r() * height, // y-position
        r: 4 + (r() * width / 25), // radius
        a: r() * Math.PI * 2, // angle
        v: 0.1 + r() * 0.5 // velocity
    });
}
```

Each bubble has the following properties - 

- `f : a string that represents the color in 'hsla' format`. Due to `globalCompositeOperation` settings we’ll see later, there is no point in adding color, just the formula for opacity matters, which defaults to `${r() * 0.1}`.  Basically the bubbles take up different shades of the background based on the opacity.
- `x,y : the x,y position of the bubble on the canvas`. Generated at random.
- `r: radius of the bubble`. Generated at random
- `a: the angle in which the bubble moves`. Generated at random, 0 to 360 degrees.
- `v: velocity of the specific bubble`. In case the canvas is being animated, the velocity at which the bubble moves.

Up until this point everything was just the setup and configuration, the real painting and animation happens in `draw()`.  The draw function is a IIFE ([Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)), i.e. it is defined and immediately invoked inside the `window.bubbly` function.

```js
(function draw() {
    if (canvas.parentNode === null) {
        return cancelAnimationFrame(draw)
    }
    if (c.animate !== false) {
        requestAnimationFrame(draw);
    }
    // other logic...
    
})(); //immediately invoked
```

In the above fragment the two main blocks are the call to either `requestAnimationFrame` or `requestAnimationFrame`. If the user has not disabled animation, the `requestAnimationFrame` function is called with the `draw` function as the argument. This tells the browser to call the `draw` function on the next repaint. **This is something you should note**, `draw()` is called repeatedly multiple times a second to repaint the canvas (for the animation).

Then follows the actual logic for the painting/animation (inside the draw function itself). First you draw the background.

```js
context.globalCompositeOperation = "source-over";
context.fillStyle = gradient;
context.fillRect(0, 0, width, height);
context.globalCompositeOperation = c.compose || "lighter";
```

The `globalCompositeOperation` being set to `"``source-over``"` ensures that it overwrites whatever is currently present. W3Schools has a [quick overview](https://www.w3schools.com/tags/canvas_globalcompositeoperation.asp) of how globalCompositeOperation works.

The `fillStyle` is set to the gradient created earlier, and `fillRect` fills the canvas overwriting the previous image. 

Then the `globalCompositeOperation` is set to  `"``lighter``"` which basically makes the overlapping area between two or more bubbles lighter. This setting “adds” up the overlapping color to bring it closer to white, which is why earlier I had mentioned that setting the color for the bubble is pointless and only the opacity matters. Otherwise which ever color you chose would be added with the background anyway and you’d end up with a whitish color.

Finally logic for the bubble animation,

```js
(function draw() {
    //earlier logic.....
    
    bubbles.forEach(bubble => {
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        context.fillStyle = bubble.f;
        context.fill();
        // update positions for next draw
        bubble.x += Math.cos(bubble.a) * bubble.v;
        bubble.y += Math.sin(bubble.a) * bubble.v;
        if (bubble.x - bubble.r > width) {
            bubble.x = -bubble.r;
        }
        if (bubble.x + bubble.r < 0) {
            bubble.x = width + bubble.r;
        }
        if (bubble.y - bubble.r > height) {
            bubble.y = -bubble.r;
        }
        if (bubble.y + bubble.r < 0) {
            bubble.y = height + bubble.r;
        }
    });

})(); //immediately invoked. End of draw()
```

For each bubble object in the array, we loop through and draw the bubble on the canvas and then update it’s position. The bubbles are drawn by `context.arc` at the  `x, y`  position of the object, with radius `r` and angle `2*PI` radians, which is 360 degrees. `context.fill()` fills in the opacity.

Next the position of the bubble is updated. The bubble’s x coordinate is updated by `Math.cos(bubble.a) * bubble.v` px, and the y coordinate is updated by `Math.sin(bubble.a) * bubble.v` px. Here the `bubble.v` is the velocity of the specific bubble. In the case of x-axis the velocity is multiplied by the `cos` of the angle as that gives the x-axis projection, similarly `sin` always gives the y axis projection.

Finally the four “if” blocks check if the bubble has crossed the border, if so it just moves it to the other side of the canvas. The blocks check for out of bounds of the right, left, bottom and top boundary of the canvas respectively. 

Example, assume we have a canvas that is 100px wide and a bubble is of radius 5px, and the bubble is moving parallel to the x-axis towards the right. Once the bubble crosses the `x=105` mark, the condition for the first block `bubble.x - bubble.r > width` becomes true. The bubble’s x position is now set to ‘-5’, which means it appears from the left side along the same height.

This is the end of the `draw()` function which is called repeatedly via `requestAnimationFrame(draw)`. That is pretty much all there is to this library.

