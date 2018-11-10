---
layout: post
title: Ajax type ahead
desc: >
  This is the sixth project of Wes Bos's JS30 series. We will be creating a autocomplete dropdown for a search bar, the data being fetched via ajax.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-02
---


This is the sixth project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We will be creating a autocomplete dropdown for a search bar, the data being fetched via ajax.

Here is the video :

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/y4gZMJKAeWs' frameborder='0' allowfullscreen></iframe></div>

The starter files

<iframe height='471' scrolling='no' title='JS30-06-type-ahead-a' src='//codepen.io/deepakkarki/embed/wXpmqv/?height=431&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/wXpmqv/'>JS30-06-type-ahead-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

This is a JS heavy project, the HTML and CSS are rather simple, we don't have to bother with them much.

```html
<form class="search-form">
  <input type="text" class="search" placeholder="City or State">
  <ul class="suggestions">
    <li>Filter for a city</li>
    <li>or a state</li>
  </ul>
</form>
```

This is all the html we have to be concerned with. The CSS just styles the search bar and the dropdown elements (`ul.suggestions`). Most of the visual effects are done through some simple box shadows, gradients and transforms. We don't have to touch any css for this project.

Now to get the dropdown component working, we need to do the following things

1. We have the url where we're getting the data from, fetch the json data.
2. Filter the required elements from our data array.
3. Listen to user input in the search box.
4. Display the data in the dropdown.


### Fetching the data

```js
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = []
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities = data)
```

This will fetch the data from the endpoint, get a promise that will resolve to a response object, then we get the json data from that (well, another promise that resolves to the data we need). A sample json element -

```js
{
    city: "New York",
    growth_from_2000_to_2013: "4.8%",
    latitude: 40.7127837,
    longitude: -74.0059413,
    population: "8405837",
    rank: "1",
    state: "New York"
}
```

### Filter the required elements from our data array.

We'll be using a regex on every element of the cities array and filter out matching elements.

```js
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
    // if the regex was present, we match returns a match object, else null
  });
}
```

We have to use the `RegExp()` object and not the standard notation of the js regex (`/regex-here/`) since we are matching by the variable `wordToMatch`. There is no way to insert a variable in the regex.

### Listen to user input in the search box

```js
function displayMatches(){
  // to be implemented
}

const searchInput = document.querySelector('.search');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
```

This is as straightforward as attaching the event listeners on change and keyup on the search bar. Every time the user types something, `displayMatches` is triggered and it updates the dropdown.


### Display the data in the dropdown

Finally we'll be implementing the `displayMatches` function. `this.value` holds the current text in the search input field.

1. Get the matching cities / states for the current input
2. Convert the array of matching items into html equivalent (for the dropdown)
3. Add the generated html under `div.suggestions`



```js
const suggestions = document.querySelector('.suggestions');

function displayMatches(){

  // step 1
  const matchArray = findMatches(this.value, cities);

  // step 2
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    return `
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).join('');

  // step 3
  suggestions.innerHTML = html;
}
```

This completes the features we need to make this functional. But we'll add a few more cosmetic touches - such as highlighting the matching text of the city/state name and also comma separating the numbers separately.

```js
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
```

That completes our app! Here is the final code -

<iframe height='471' scrolling='no' title='JS30-06-type-ahead-b' src='//codepen.io/deepakkarki/embed/OEzvjK/?height=411&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/OEzvjK/'>JS30-06-type-ahead-b</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>