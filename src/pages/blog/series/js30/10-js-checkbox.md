---
layout: post
title: JS Checkbox
desc: >
  This is the tenth project of Wes Bos's JS30 series. We'll be building a gmail style "hold shift and check all" items type list. You can check any element in the list, then hold shift and check another element, and all the elements in between should also get checked.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 10
---


This is the tenth project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We'll be building a gmail style "hold shift and check all" items type list. You can check any element in the list, then hold shift and check another element, and all the elements in between should also get checked.

Check out the video here 

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/RIPYsKx1iiU' frameborder='0' allowfullscreen></iframe></div>

The starter code

<iframe height='465' scrolling='no' title='JS30-10-select-checkbox-a' src='//codepen.io/deepakkarki/embed/WyzZzy/?height=265&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/WyzZzy/'>JS30-10-select-checkbox-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

We won't be touching the HTML or CSS in this project, but just have a look anyway, the structure is straightforward. 

The HTML is primarily a `div.inbox` with `div.item` as children. Each item has an checkbox `<input>` and a `<p>` element.

```html
<div class="inbox">
  <div class="item">
    <input type="checkbox">
    <p>This is an inbox layout.</p>
  </div>
  <div class="item">
    <input type="checkbox">
    <p>Check one item</p>
  </div>
  ... <!-- more items -->
</div>
```

Clicking on the checkbox strikes through the sibling paragraph. The CSS responsible for that -

```css
input:checked + p {
  background: #f9f9f9;
  text-decoration: line-through;
}
```

-----

Now let's get on with our JS bits! At a high level we have the following steps -

1. Keep track of the latest checked
2. See if shift is being clicked
3. If shift is clicked, run through the list of items and check everything in between


### Keep track of latest checked

We'll track the latest checked in `lastChecked`, every time there is a click on a checkbox we'll update the `lastChecked`.

```js
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]')
let lastChecked

function handleCheck(e) {
    lastChecked = this
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck))
```


### Check for shift

We need to check for shift because only if shift is pressed do we want to do a group check of checkboxes.

```js
function handleCheck(e) {

  //check if shift key was pressed 
  // and that the checkbox is checked
  if (e.shiftKey && this.checked) {
    //logic goes here
  }

  // the logic comes before updating last check as we don't want to 
  //   overwrite the variable before using it
  lastChecked = this
}
```


### Run through the list of items

Now we need to loop through all the items in the inbox until we hit the `lastChecked` checkbox or the checkbox currently being clicked. If we hit `lastChecked` first, then we need to continue checking all boxes till we encounter the current box. If we come across the current box first, then we check until we hit `lastChecked`. Either way we need to check all items in between `lastChecked` and the current item.

```js
function handleCheck(e) {

  if (e.shiftKey && this.checked) {
    let inBetween = false
    checkboxes.forEach(cb => {
      if(cb === this || cb === lastChecked) inBetween = !inBetween

      if(inBetween) cb.checked = true
    })
  }

  lastChecked = this
}
```

We use `inBetween` to keep track of whether the current element in the loop is in between `this` and `lastChecked`.

The codepen with the final code

<iframe height='549' scrolling='no' title='JS30-10-select-checkbox-b' src='//codepen.io/deepakkarki/embed/oyqoqp/?height=549&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/oyqoqp/'>JS30-10-select-checkbox-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

-----

**NOTE** I know there are certain "bugs" in the code (same as Wes Bos's). 

* Check something, uncheck it and then shift check another box, everything in between is still checked.
* shift+check the very first time you're clicking a box, everything till the end is checked as well.

To tackle these wouldn't be too hard code wise, but I let it be. It is going to be hard user flow wise. Since I don't really have an end user, there isn't much point rationalizing how this should look if it were perfect. Hence my decision to leave it as it is.