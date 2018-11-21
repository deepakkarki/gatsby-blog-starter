---
layout: post
title: JS Array Cardio - part 2
desc: >
  This is the seventh project of Wes Bos's JS30 series. We will be creating a bunch of small examples to play with various array methods such as `some()`, `every()`, `find()`, `findIndex()`, `splice()`
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 7
---

This is the seventh project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We will be creating a bunch of small examples to play with various array methods such as `some()`, `every()`, `find()`, `findIndex()`, `splice()`

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/QNmRfyNg1lw' frameborder='0' allowfullscreen></iframe></div>

Here is the codepen with the starter files

<iframe height='456' scrolling='no' title='JS30-07-array-cardio-a' src='//codepen.io/deepakkarki/embed/oypQgp/?height=376&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/oypQgp/'>JS30-07-array-cardio-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

So in this exercise we'll be doing some more array exercises. Our sample data -

```js
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];
```

## Array.prototype.some()

The `[].some(test_fn)` method tests whether at least one element in the array passes the test implemented by the provided function (`test_fn`). Each element of the array is iterated upon and the element is passed to `test_fn`, if it returns true for any one of the elements, the `[].some()` method ends and returns true. If `test_fn` returns false for each element, only then does `[].some()` return false. 

Learn more @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

Task : **Is at least one person 19 or older?**

```js
res = people.some(person => {
        const currentDate = (new Date()).getFullYear())
        return currentDate - person.year >= 19
    })
console.log(res) //true
```


## Array.prototype.every()

The `[].every(test_fn)` method tests whether all elements in the array passes the test implemented by the provided function (`test_fn`). Each element of the array is iterated upon and the element is passed to `test_fn`, if it returns true for each one of the elements, the `[].every()` method returns true. If `test_fn` returns false for even element, `[].every()` returns false.

Learn more @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

Task : **Is everyone 19 or older?**

```js
res = people.every(person => {
        const currentDate = (new Date()).getFullYear())
        return currentDate - person.year >= 19
    })
console.log(res) //false
```


## Array.prototype.find()

The `[].find(test_fn)` method returns the value of the first element in the array that satisfies the provided testing function (`test_fn`). Otherwise undefined is returned. This works like `[].some()`, except that it returns the first instance of the object rather than true or false.

Learn more @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

Task : **find the comment with the ID of 823423**

```js
const com = comments.find(comment => comment.id == 823423)
console.log(com) // { text: 'Super good', id: 823423 }
```


## Array.prototype.findIndex()

The `[].findIndex(test_fn)` method returns the index of the first element in the array that satisfies the provided testing function (`test_fn`). Otherwise -1 is returned. Works just like `[].find()`, except it returns the index, not the element.

Learn more @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

Task : **Delete the comment with the ID of 823423**

```js
const index = comments.findIndex(comment => comment.id == 823423)
const deletedComment = comments.splice(index, 1)
console.log(deletedComment)
console.log(comments)
```

That is it for this project. I haven't updated the codepen as there isn't much updates to see, just open the console and try this out!