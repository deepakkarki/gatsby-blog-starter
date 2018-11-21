---
layout: post
title: Flex Panel Gallery
desc: >
  This is the fifth project of Wes Bos's JS30 series. We will be creating a panel based gallery with flexbox, CSS transitions and javascript.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-02
part: 5
---


This is the fifth project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We will be creating a panel based gallery with flexbox, CSS transitions and javascript. This is CSS heavy and the JS bits just add and removes classes from dom elements.

Here is the video :

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/9eif30i26jg' frameborder='0' allowfullscreen></iframe></div>

We have the following starter code :

<iframe height='496' scrolling='no' title='JS30-05-flex-gallery-a' src='//codepen.io/deepakkarki/embed/mKqjVo/?height=496&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/mKqjVo/'>JS30-05-flex-gallery-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The HTML is straightforward -

```js
<div class="panels">
    <div class="panel panel1">
        <p>Hey</p>
        <p>Let's</p>
        <p>Dance</p>
    </div>
    <div class="panel panel2">
        ...
    </div>
    ...
</div>
```

The whole page content is held in the `div.panels` element and each gallery item is a `div.panel` element. `panel1` to `panel5` classes just add the background. All positioning is done via Flexbox. In the CSS `.panel` definition, other than the basic styling, the most relevant bits for us is the transition property. 

```css
.panel{
  transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
            flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
            background 0.2s;
}
```

The transition property is applied to the `font-size`, `flex` and `background`. 


As of now the panels are horizontally aligned, we want them to be vertical. For this, make the `panels` element a flex container. This makes the elements align vertically.

```css
.panels{
  display: flex;
}
```

Now to fix the spacing and alignment of the vertical elements -

```css
.panel{
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
```

Here making `flex: 1` ensures they spread out and take equal amount of space, making each panel itself a flex container would ensure that the text aligns in the middle. 


Now for the animation. First let's move the first and last `<p>` of each panel above and below the screen respectively. 
(Note : I've done this slightly different than Wes Bos, he made each `<p>` element a flex container and translated it up/down `100%`, where as I've just moved them up/down `50vh` without having to add any flex properties.)

```css
panel > *:first-child { transform: translateY(-50vh); }
.panel.open-active > *:first-child { transform: translateY(0); }
.panel > *:last-child { transform: translateY(50vh); }
.panel.open-active > *:last-child { transform: translateY(0); }
```

When the class `open-active` is added to the panel, the `<p>`'s are moved back into view. Also the panel should get bigger when it's opened

```css
.panel.open {
  font-size: 40px;
  flex: 5;
}
```

`font-size` increases from `2em` to `40px` (over 0.7s) and the width increases to 5x of what it was before!

This completes the CSS part of the animation. Try adding `open` and `open-active` classes to one of the panels below.

<iframe height='495' scrolling='no' title='JS30-05-flex-gallery-b' src='//codepen.io/deepakkarki/embed/OEOwEy/?height=465&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/OEOwEy/'>JS30-05-flex-gallery-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


Now we need to do the following in javascript!

1. Listen for 'click' event on a panel, add the 'open' class
2. Listen for 'transitionend' and add the 'open-active' class

first part -

```js
function toggleOpen(){
 this.classList.toggle('open')
}

document.querySelectorAll('.panel')
        .forEach(panel => panel.addEventListener('click'), toggleOpen)
```

second part -

```js
function toggleActive(e){
  if(e.propertyName.includes('flex')){
    this.classList.toggle('open-active')
  }
}

document.querySelectorAll('.panel')
        .forEach(panel => panel.addEventListener('transitionend'), toggleActive)
```

That completes our web page! The final code

<iframe height='497' scrolling='no' title='JS30-05-flex-gallery-c' src='//codepen.io/deepakkarki/embed/ERbMMe/?height=427&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/ERbMMe/'>JS30-05-flex-gallery-c</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>