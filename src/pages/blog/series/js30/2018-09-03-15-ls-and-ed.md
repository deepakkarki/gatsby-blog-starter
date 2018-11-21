---
layout: post
title: LocalStorage and Event Delegation
desc: >
  This is the 15th project of Wes Bos's JS30 series. We'll be building a to-do list of sorts, with local storage to persist the information across a refresh or reload.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 15
---


This is the 15th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We'll be building a to-do list of sorts, with local storage to persist the information across a refresh or reload.

The video can be found here

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/YL1F4dCUlLc' frameborder='0' allowfullscreen></iframe></div>

The codepen for the starter code

<iframe height='454' scrolling='no' title='JS30-15-LocalStorage-a' src='//codepen.io/deepakkarki/embed/VddKpd/?height=404&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/VddKpd/'>JS30-15-LocalStorage-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

HTML 

```html
<div class="wrapper">
  <h2>LOCAL TAPAS</h2>
  <p></p>
  <ul class="plates">
    <li>Loading Tapas...</li>
  </ul>
  <form class="add-items">
    <input type="text" name="item" placeholder="Item Name" required>
    <input type="submit" value="+ Add Item">
  </form>
</div>
```

The text box to add items is essentially a `form.add-items` element. The list of items already added will be displayed in the `ul.plates` element.
There was another other SVG logo as a part of the HTML I didn't include as it just made it harder to read (with no significance to the functionality).

As for the CSS, all the styling is quite standard, except one I found interesting. If you'd watch the video you'd see that the checkbox gives you a taco when you check it. Clearly not the standard defaults! So what's happening here?

Let's look at what an item looks like when it's added to the list, you'll see that the checkbox has a label next to it with the `for="item0"` property. This links the label to the element with `id="item0"`, which is the adjacent checkbox. So clicking on the label has the same effect as clicking on the adjacent checkbox.

```html
<li>
  <input type="checkbox" data-index="0" id="item0" checked="">
  <label for="item0">hi</label>
</li>
```

Now in the CSS, all input elements under `.plates` is set to `display: none`, i.e. the checkbox won't be seen. Instead the empty white box and the taco come from the `label:before`, where the label is the one adjacent to the invisible checkbox. When the checkbox is checked (`input:checked`), it turns the content of the before pseudo element to a taco. So what we see as getting checked/unchecked is not even the checkbox, but rather a pseudo element of the label.

```css
.plates input {
  display: none;
}

.plates input + label:before {
  content: '⬜️';
  margin-right: 10px;
}

.plates input:checked + label:before {
  content: '🌮';
}
```

You can learn more about the `:before` pseudo element @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/::before)

----

The JS given to us

```js
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = [];
```

We have handles to the form where the user inputs new items and the list where the items are displayed. The `items` array holds all the items.

Main steps involved to complete our app

* Add new items to the `items` array
* Display the items in the `items` array
* Toggle an item
* Save the list to local storage


## Adding new items

We add new items using a html form. Submitting a form by default makes a get request and goes to the new URL. We call `e.preventDefault()` to prevent the default behavior.

```js
function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
      text,
      done: false
  };

  items.push(item);

  //  display the list - populateList();
  //  store to local storage - localStorage.set()

  this.reset();
}

addItems.addEventListener('submit', addItem);
```

In `addItem()`, `this` refers to the `form.add-items` DOM object. We then select the text input element and get the text inside of it. We create a new items object and then push it into the items list. Once it is added we call `reset()` on the form to clear the input text box.


## Display the items

`populateList()` does the work of taking in an array and displaying the list. We could have `populateList()` just use the global `items` and `itemsList` variables, but that would be hardcoding, it's better to pass the variables in case we ever want to use the functions for anything else.

```js
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function addItem(e){
  //...
  //  display the list - populateList()
  populateList(items, itemsList)

  //...
}
```

`populateList()` uses template strings and `[].map` to create `<li>` elements from each element in the array, which is late concatenated into one string which `platesList.innerHTML` is set to. `addItem` uses `populateList` to render all the current items.


## Toggle an item

`toggleDone` deals with the click event to toggle an item. We can attach a listener on the checkbox element, but the moment we add a new item, all `<li>` elements are recreated by `populateList`. Hence adding an event listener on those items makes no sense. We solve this issue by using event delegation - we let the parent element take care of the click event to toggle an item. The parent in this case is the `ul.item-plates` element.

```js
function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    populateList(items, itemsList);
  }

itemsList.addEventListener('click', toggleDone);
```

If you had paid close attention to the `populateList` function you'd see that the input element for the item has `data-index=${i}` where `i` is the index of that item in the `items` array. So now `toggleDone` checks if the event target is a input element (only input element being a checkbox), extracts the index from the data attribute, toggles the `done` in the `items` array, and then re-renders the list by calling `populateList`.


Here is the code up until this point 

<iframe height='437' scrolling='no' title='JS30-15-LocalStorage-b' src='//codepen.io/deepakkarki/embed/vrrXZz/?height=437&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/vrrXZz/'>JS30-15-LocalStorage-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## Save the list to LocalStorage

We want to persist the list after a refresh or for a later point in time, for this we'll use local storage. Local storage is a key value store where the key and value are strings. 

A simple example

```js
// set the value "Tom" for key "myCat" in the local storage
localStorage.setItem('myCat', 'Tom'); 

// cat has value "Tom"
var cat = localStorage.getItem('myCat'); 

//remove the "myCat" key from local storage
localStorage.removeItem('myCat'); 
```

You can learn more about Local Storage @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

Since we want to keep the local storage in sync with the UI, we'll update the local storage when ever we call `populateList()`.

```js
function toggleDone(e) {
  //...
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function addItem(e) {
  //...
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
  //...
}
```

Also we need to get the items from local storage when we load the page. We'll modify `items` array to take read from the local storage first, if it doesn't have an 'items' key, we'll assign it to an empty array as we had earlier.

```js
const items = JSON.parse(localStorage.getItem('items')) || [];
```

That completes our to-do list kind of app. The final codepen (note that local storage bits may not work in the codepen iframe)

<iframe height='465' scrolling='no' title='JS30-15-LocalStorage-c' src='//codepen.io/deepakkarki/embed/QxxGdv/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/QxxGdv/'>JS30-15-LocalStorage-c</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>