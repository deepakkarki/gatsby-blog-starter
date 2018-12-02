---
layout: post
title: Stripe nav
desc: >
  This is the 26th project of Wes Bos's JS30 series. Today we'll re-creating the smooth Stripe dropdown follow-along navigation.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-04
part: 26
---



This is the 26th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Today we'll re-creating the smooth Stripe dropdown follow-along navigation.

Video -

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/GvuWJSXYQDU' frameborder='0' allowfullscreen></iframe></div>

Starter Code -

<iframe height='454' scrolling='no' title='JS30-26-StripeNav-a' src='//codepen.io/deepakkarki/embed/PayxZw/?height=414&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/PayxZw/'>JS30-26-StripeNav-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


We have quite a bit of HTML and CSS given to us, but luckily we don't have to modify any of those, just write the JS bits.

The HTML we interact with is the `nav.top` element.

```html
<nav class="top">
    <div class="dropdownBackground">
      <span class="arrow"></span>
    </div>

   <!-- nav bar which we see -->
    <ul class="cool">
      <!-- about me -->
      <li>...</li>
      <!-- Courses -->
      <li>...</li>
      <!-- other links -->
      <li>...</li>
    </ul>
  </nav>
```

The `div.dropdownBackground` is the white background you see behind the nav dropdown when you hover over them. The `ul.cool` contains the actual nav items, the `<li>`'s corresponds to the 'about me', 'courses' and 'other links' items. Just for completeness let's have a look at a single nav element

```html
<li>
  <a href="#">About Me</a>
  <div class="dropdown dropdown1">
    <div class="bio">
      <img src="https://logo.clearbit.com/wesbos.com">
      <p>Wes Bos sure does love web development. He teaches things like JavaScript, CSS and BBQ. Wait. BBQ isn't part of web development. It should be though!</p>
    </div>
  </div>
</li>
```

Each element has a link tag with the text you see on the nav, and below that is the dropdown content. The dropdown content (`div.dropdown`) should become visible when you hover over the corresponding `<li>` element. The dropdown has `display:none, opacity:0`, when the user hovers over the item it animates into view.

-----

So let's breakdown the steps required to achieve the effect -

1. Get all the handles to the DOM elements we wish to manipulate
2. Track mouse enter and leave
3. Show dropdown elements on mouse enter/leave
4. Show the background highlight, 
5. Change the width of the highlight to match the dropdown
6. Change the position to fit behind the dropdown


### Get handle on DOM elements

```js
const triggers = document.querySelectorAll('.cool > li');
const background  = document.querySelector('.dropdownBackground');
const nav  = document.querySelector('.top');
```


### Track mouse enter and leave

```js
function handleEnter(){
}
function handleLeave(){
}
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
```

We add the `mouseenter` and `mouseleave` event listeners on the `<li>` elements since we don't want to 


### Show dropdown on mouse enter/leave

We use the `trigger-enter` and `trigger-enter-active` CSS classes to get our desired effect. These classes are added to the `<li>` elements holding the dropdown.

```css
  .trigger-enter .dropdown {
    display: block;
  }

  .trigger-enter-active .dropdown {
    opacity: 1;
  }
```

We'll add `trigger-enter-active` 150ms after adding `trigger-enter` since we can't animate display and opacity at the same time!

```js
function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.add('trigger-enter-active'), 150);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
}
```

At this point if you hover over the nav elements real quick you'll see that the `trigger-enter-active` class remains even after you're no longer hovering on the element. This is because `trigger-enter` is initially set, then you immediately move out (before 150ms) so `handleLeave` removes the trigger classes, only then is `trigger-enter-active` set (the initial 150ms callback)! 

We can fix this in handle enter by changing the callback to -

```js
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
``` 

Now the callback check whether the `trigger-enter` class exists, only then does it add `trigger-enter-active`.


### Show the background highlight

To the `div.dropdownBackground` element add the `open` class to make it visible, remove it to make it disappear! Open just makes the `opacity : 1`, which is otherwise zero.

```js
// in handleEnter()
background.classList.add('open')

// in handleLeave
background.classList.remove('open')
```


### Change the width of highlight

```js
function handleEnter(){
    //....

    const dropdown = this.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();

    const height = dropdownCoords.height
    const width = dropdownCoords.width

    background.style.setProperty('width', `${width}px`);
    background.style.setProperty('height', `${height}px`);
}
```

`elem.getBoundingClientRect()` gives us the dimensions and position of the element. The dimensions are absolute and the positions are relative.
We get the dimensions of the dropdown corresponding to the element we're hovering over (`this`) and then set the dimensions of our background to the same value.


### Change the position

```js
function handleEnter(){
    // ....

    const navCoords = nav.getBoundingClientRect()
    const top = dropdownCoords.top - navCoords.top
    const left = dropdownCoords.left - navCoords.left
    background.style.setProperty('transform', `translate(${left}px, ${top}px)`)
}
```

Here we subtract `<nav>`'s top and left value as `getBoundingClientRect()` returns position values that are relative to the parent.


That completes this exercise! Here is the final codepen -

<iframe height='465' scrolling='no' title='JS30-26-StripeNav-b' src='//codepen.io/deepakkarki/embed/BVqGRK/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/BVqGRK/'>JS30-26-StripeNav-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>