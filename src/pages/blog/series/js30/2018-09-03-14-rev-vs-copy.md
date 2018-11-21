---
layout: post
title: JS Object Reference vs Copying
desc: >
  This is the 14th exercise of Wes Bos's JS30 series - A series of experiments to understand the difference between copying by value and by reference.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 14
---


This is the 14th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
Well, this isn't really a project, just a series of experiments to understand the difference between copying by value and by reference.

Here is the video -

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/YnfwDQ5XYF4' frameborder='0' allowfullscreen></iframe></div>

I won't be adding a codepen as you can simply copy paste the commands into your dev-tools console.

Lets start with strings and numbers

```js
start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log(age, age2); //100, 100
age = 200;
console.log(age, age2); //200, 100

let name = 'Wes';
let name2 = name;
console.log(name, name2); //wes, wes
name = 'wesley';
console.log(name, name2); //wesley, wes
```

strings and numbers are immutable, we can reassign variables to newer strings/numbers, but we can't manipulate values itself.


Let's say we have an array

```js
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
```

and we make a copy of it.
```js
const team = players;
console.log(players, team);
```

You might think we can just do something like this:
```js
team[3] = 'Lux';
```

however what happens when we update that array?

```js
console.log(players, team);
//["Wes", "Sarah", "Ryan", "Lux"] ["Wes", "Sarah", "Ryan", "Lux"]
```

Oh no - we have edited the original array too! Why? It's because that is an array reference, not an array copy. They both point to the same array!

So, how do we fix this? We take a copy instead!

```js
// slice copies all the elements to the new array
const team2 = players.slice();

// concat also creates a new array
const team3 = [].concat(players);

// or use the new ES6 Spread
const team4 = [...players]

// array from is another verstile way of copying, 
//  you can add extra stuff like a map func or a 'this' to be used
const team5 = Array.from(players);
```

Try updating any of these and see that the players array remains unaffected.


-----

Objects are similar to arrays, let's say we have a person object

```js
const person = {
    name: 'Wes Bos',
    age: 80
};
```

We make a copy

```js
const captain = person;
captain.number = 99;
console.log(person) //{name: "Wes Bos", age: 80, number: 99}
```
How do we take a copy instead?

```js
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
console.log(cap2);
```

We can use the [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method to create a clone. 


This is only 1 level deep - both for Arrays and Objects. You can use a library like lodash has a cloneDeep method, but you should think twice before using it (performance reasons, plus you probably wouldn't need it)!


```js
const wes = {
    name: 'Wes',
    age: 100,
    social: {
      twitter: '@wesbos',
      facebook: 'wesbos.developer'
    }
};

const dev = Object.assign({}, wes);
dev.social.twitter = "@yolo"
console.log(wes)
// Object has changed, twitter handle is now @yolo
// {name:"Wes", age:100, social:{twitter: "@yolo", facebook: "wesbos.developer"}}

const dev2 = JSON.parse(JSON.stringify(wes));
dev2.social.twitter = "@yolo2"
console.log(wes)
// Output hasn't changed, twitter handle is not @yolo2
// {name:"Wes", age:100, social:{twitter: "@yolo", facebook: "wesbos.developer"}}
```

We can have a deep copy using `JSON.parse` and `JSON.stringify`. In the second case, changing a nested object in `dev2` did not affect the original object.