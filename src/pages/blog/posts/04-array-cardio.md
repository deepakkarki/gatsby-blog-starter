---
layout: post
title: JS Array cardio
desc: >
  This is the fourth project of Wes Bos's JS30 series. We will be creating a bunch of small examples to play with various array methods such as `map`, `reduce`, `filter` and `sort`.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-02
categories: ["js", "yolo", "fomo"]
---


This is the fourth project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We will be creating a bunch of small examples to play with various array methods such as `map`, `reduce`, `filter` and `sort`.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/HB1ZC7czKRs' frameborder='0' allowfullscreen></iframe></div>

Here is the codepen with the starter files

<iframe height='458' scrolling='no' title='JS30-04-Array-Cardio-a' src='//codepen.io/deepakkarki/embed/vreQPN/?height=458&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/vreQPN/'>JS30-04-Array-Cardio-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Here is the data we have

```js
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
```

So now we have a few lists and maps to work on (provided with the template), let's tackle the problems one by one!


### Array.prototype.filter()

The `[].filter(test_fn)` method creates a new array with all elements that pass the condition implemented by the provided function (`test_fn`). Each element of the array is iterated upon and passed to `test_fn` as an argument, if `test_fn` returns a "truthy" for the element, it is included in the new list, if it returns a "falsey", it is not. Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

Task : **Filter the list of inventors for those who were born in the 1500's**

```js
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600))
console.table(fifteen)
```


### Array.prototype.map()

The `[].map(transform_fn)` method creates a new array with the results of calling a provided function (`transform_fn`) on every element in the calling array.
Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

Task : **Give us an array of the inventor first and last names**

```js
const names = inventors.map(inventor => `${inventor.first} ${inventor.last}`)
console.log(names)
```


### Array.prototype.sort()

The `[].sort(cmp_fn)` method sorts the elements of an array in place and returns the array. You can pass an optional function as an argument (`cmp_fn`), which will be used to compare two elements with each other. The `cmp_fn(a,b)` takes in two arguments - each being an element of the array being sorted.
The compare function -
* should return a value lesser than 0 if 'a < b'. ('a' will be placed at a lower index than 'b')
* should return a value equal to 0 if 'a == b'    ('a' and 'b' will remain where they are wrt each other)
* should return a value greater than 0 if 'a > b' ('b' will be places at a lower index than 'a')

Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

Task : **Sort the inventors by birthdate, oldest to youngest**

```js
const sorted = inventors.sort((a, b) => b.year - a.year)
console.table(sorted)
```


### Array.prototype.reduce()

The `[].reduce(acc_fn [, init_val])` method applies a function (`acc_fn`) against an accumulator (initial value being the first element of the array unless `init_val` is passed) and each element in the array (from left to right) to reduce it to a single value. Example -

```js
const arr = [1, 2, 3, 4];

// 5 + 1 + 2 + 3 + 4
x = arr.reduce((accumulator, currElem) => accumulator + currElem, 5));
// x = 15
```

Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

Task: **How many years did all the inventors live?**

```js
// acc at any given point of time is the sum of all ages iterated until then. initial value is 0
const years = inventors.reduce((acc, inventor)=> acc + (inventor.passed -inventor.year), 0)
console.log(years)
```


### Exercise with map and filter

Task : Create a list of Boulevards in Paris that contain 'de' anywhere in the name. Use this webpage https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

Steps :
* Select all the `<a>` elements under `div.mw-category` from the page.
* Convert the NodeList into an array
* From the above array, get the array of names of the Boulevards
* Filter the ones with 'de' in it

```js
const category = document.querySelector('.mw-category a');
const links = Array.from(category);
const de = links
            .map(link => link.textContent)
            .filter(streetName => streetName.includes('de'));
```


### Sort exercise

Task : Sort the people alphabetically by last name

In the comparison function, just split by `", "` and compare the first elements in the arrays, if p1's last name is greater than p2's last name, `return 1` indicating that p1 is greater, else `return -1` indicating that p2 is greater.

```js
const sorted = people.sort((p1, p2) => {
    return p1.split(', ')[0] > p2.split(', ')[0]? 1: -1
})
console.table(sorted)
```


### Reduce Exercise

Task : Sum up the instances of each element in the following list. Basically return a object with the name and count of the words that appear in the list.

```js
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
```

Solution

```js

const transport = data.reduce((countMap, elem) => {
    countMap[elem] = countMap[elem]? countMap[elem]+1 : 1
    return countMap
}, {})


// alternatively using forEach, which actually seems more well suited
trans = {}
data.forEach(elem => (trans[elem] = trans[elem]? trans[elem]+1 : 1) )
```

Thats it for this tutorial!