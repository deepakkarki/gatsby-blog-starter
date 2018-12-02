---
layout: post
title: Dev tools tricks
desc: >
  This is the ninth project of Wes Bos's JS30 series. This will be a quick set of tips and tricks relating to the chrome dev tools console!
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 9
---


This is the ninth project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
This will be a quick set of tips and tricks relating to the chrome dev tools console!

You can check out the video here

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/xkzDaKwinA8' frameborder='0' allowfullscreen></iframe></div>

There isn't much to talk about in this blog post as the video is a random assortment of tricks and tips, so I'll keep is short and simple.

### 1. Debugging

```html
<p onClick="makeGreen()">×BREAK×DOWN×</p>
<script>
    function makeGreen() {
      const p = document.querySelector('p');
      p.style.color = '#BADA55';
      p.style.fontSize = '50px';
    }
</script>
```

If you see some changes on the webpage (eg. an animation) and want to see which JS bit is causing that, then you can go to the DOM inspector and right click on the element and set a breakpoint on node attribute modification. The next time a JS function tries to change the attribute it will be paused in the debugger at that point!

**The following are variations of `console.logs`**

### 2. Regular

```js
console.log('hello');
```


### 3. Interpolated

You can format `console.log` as you would have formatted `printf`
```js
console.log('Hello I am a %s string!', '💩');
```


### 4. Styled

You can add styles to your logged output in the console.

```js
console.log('%c I am some great text', 'font-size:50px; background:red; text-shadow: 10px 10px 0 blue')
```


### 5. warning!

Give a warning level log with a stacktrace.
```js
console.warn('OH NOOO');
```


### 6. Error :|

Give an error level log with a stacktrace.
```js
console.error('Shit!');
```


### 7. Info

Give a info level log with no stacktrace.
```js
console.info('Crocodiles eat 3-4 people per year');
```


### 8. Testing

`console.asset(cond, msg)` takes in a condition expression, which if resolves to true does nothing, but if it is false assert logs an error level message with a stacktrace.

```js
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), 'That is wrong!');
```

### 9. clearing

Clears the console area
```js
console.clear();
```

### 10. Viewing DOM Elements

You can see the dom elements, `.dir()` also lets you inspect all the properties of the dom object.

```js
console.log(p);
console.dir(p);
```


### 11. Grouping together

You can create groups and log a set of logs under one group.

```js
dogs.forEach(dog => {
    console.groupCollapsed(`${dog.name}`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} dog years old`);
    console.groupEnd(`${dog.name}`);
});
```


### 12. counting

You can count how many times a particular output has been logged.

```js
console.count('Wes');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Wes');
console.count('Steve');

// OUTPUT
// Wes: 1
// Wes: 2
// Steve: 1
// Steve: 2
// Wes: 3
// Steve: 3
```

### 13. Timing

You can calculate the time for a certain operation using `console.time` and `console.timeEnd`. As far as the strings passed to the calls are the same, it calculates the time between `time` and `timeEnd`. 

```js
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data => {
    console.timeEnd('fetching data');
    console.log(data);
    });

// Output
// fetching data: 3556.47998046875ms
// {login: "wesbos", id: ..., …}
```

### 14. Table

If you have an array of objects with the same property, you can print them out in a tabular format.

```js
console.table(dogs);
```

----

Thats all for the tips and tricks, hope you found it useful!