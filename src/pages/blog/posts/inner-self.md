---
layout: post
title: InnerSelf
desc: > 
  This is a source code walkthrough of InnerSelf - a tiny view + state management solution using innerHTML and ES6 template literals.
  InnerSelf to mimic a React+Redux solution in a minimal way, at just 600 bytes minified, ~350 bytes when gzipped.
author:
  name: "Deepak Karki"
published: true
date: 2018-11-25
categories: ["frontend", "software-architecture", "javascript"]
---

InnerSelf is a tiny view + state management solution using innerHTML. Aims to mimic a React+Redux solution in a minimal way, at just 600 bytes minified, ~350 bytes when gzipped. This handy utility was written by [Staś Małolepszy](https://github.com/stasm) for the [js13kGames](http://js13kgames.com/) jam - a game dev competition where the whole game has to fit into 13KB!

From the readme, 
InnerSelf is inspired by [React](https://reactjs.org/) and [Redux](https://redux.js.org/). It offers the following familiar concepts:

- composable components,
- a single store,
- a `dispatch` function,
- reducers,
- and even an optional logging middleware for debugging!

It does all of this by serializing your component tree to a string and assigning it to `innerHTML` of a root element. It even imitates Virtual DOM diffing by comparing last known output of components with the new one!


# Usage

Defining a component works as follows,

```js
import html from "innerself";
function MyComponent(state) {
    return html`
        <h2>Hello ${state.name}!</h2>
    `;
}
```

The component accepts the `state` as a parameter, and returns a string. The return string is a processed tagged template literal. You can read more about it on the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). `html` is a function that takes in a template string and gives out a processed output string. So if `state.name = "Mary"` , the string returned would be `<h2>Hello Mary!</h2>` . This is the view part of the library.

Now the state management closely mimics Redux. 

The state of your app resides in a `store`, which you create using `createStore`, 

```js
const { attach, connect, dispatch } = createStore(reducer);
window.dispatch = dispatch;
export { attach, connect };
```

You pass a reducer while creating a store. A reducer is function that updates the state on dispatch of an event (done using `window.dispatch`).

Let’s see how a sample reducer would look like,

```js
// 'init' is the state of the application
const init = {
    myData : [],
    moreData : {}
};

export default function reducer(state = init, action, args) {
    switch (action) {
        case "UPDATE_STUFF": {
            const {myData} = state;
            const [value] = args;
            //return the updated state
            return Object.assign({}, state, {
                myData: [...myData, value],
            });
        }
        case "DELETE_STUFF": {
        // do some deletion, return updated state
        }
        default:
            return state;
    }
}
```

on a dispatch of a custom event, the reducer is called to update the state. Once the reducer updates the state, the dom is re-rendered. 

```js
import html from "innerself";

export default function ClickComponent(text, someVal) {
    return html`
        <button
          onclick="dispatch('UPDATE_STUFF', ${someVal})">
            ${text}
        </button>
    `;
}
```

The components have access to the state when we “connect” them using the `connect()` function. The connect function makes the state available to the component function via function parameters. So when exporting the `MyComponent` defined earlier -

```js
export default connect(MyComponent);
```

We don’t export the component as-is, we return the “connected” component. Finally we attach the app to the root of the DOM node we want it to take control of

```js
// App is a top level component
attach(App, document.querySelector("#root"))
```

Check out the live [codepen below](https://codepen.io/Cweili/pen/ZXOeQa)!

<iframe height='600' scrolling='no' title='TodoMVC Innerself' src='//codepen.io/Cweili/embed/ZXOeQa/?height=600&theme-id=0&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/Cweili/pen/ZXOeQa/'>TodoMVC Innerself</a> by Cweili (<a href='https://codepen.io/Cweili'>@Cweili</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


# Working

Here is a high level overview of how everything works together

![](https://d2mxuefqeaa7sj.cloudfront.net/s_F57CE3ACFA07830C6362E9C7099DA5F32F52AF60C784E3596A75A95B3BBA5B10_1537950088259_innerself.png)


Note that this is the user workflow once the App is attached to a DOM node and all necessary components are have been “connected”.


1. User presses a button (or some other interaction). An event is triggered by calling `dispatch()` 
2. Dispatch calls the reducer with the event type and arguments
3. Reducer takes the right action based on the event type and updates the state (well actually it returns the new state as a return value, `dispatch()` then updates it. But the net effect is the same)
4. Once the state has been updated, `dispatch()` then calls `render()`
5. `render()` processes the templates by calling the component function - a connected `MyComponent()` returns the rendered string based on the current state. The rendering is recursive as each component can have a subcomponent. More on this later.
6. It then checks if the component has changed (as compared to current DOM), if not, nothing is done. If there is an update, the innerHTML is overwritten.

Note the performance drawbacks as unlike React which does an careful DOM diffing, InnerSelf just rewrites the whole DOM (which it is attached to).


# Internals

All the core code resides in just one `index.js` file, just over 50 lines of code including comments. Talk about minimal!


## Rendering

The first part is the main rendering part, (If you’re not familiar with tagged template literals, I strongly suggest reading about it on the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).)

```js
export default function html([first, ...strings], ...values) {
    // Weave the literal strings and the interpolations.
    // We don't have to explicitly handle array-typed values
    // because concat will spread them flat for us.
    return values
        .reduce( (acc, cur) => 
                    acc.concat(cur, strings.shift()),[first] )

        // Filter out interpolations which are bools, null or undefined.
        .filter(x => x && x !== true || x === 0)
        .join("");
}
```

This `html()` function processes a template literal. This is known as a tagged template literal, where the “tag” ( `html()` )receives the template literal passed to it as a function parameter.
The first parameter is the source string split into an array, at the point of expressions in the string. So if there are `n` expressions in the template, you have an array of `n+1` strings. Next follows a variable length of parameters, each for one expression (relative position of expression is maintained).

Example,

```js
function tag(str, v1, v2){
    console.log(str)
    console.log(v1, v2)
}
let num = "two"
tag `<h1> ${1+1} = ${num}!</h1>`

// result
// ["<h1> ", " = ", "!</h1>"] --> str array
// 2, "two" --> expression values
```

The `html()` takes in all the expression values, interleaves it with the string array. If you take the above example string, you’d have 

```js
["<h1> ", 2, " = ", "two", "!</h1>"]
```

Then filter out any falsey value, and then concatenate them into a string.


## State Management

The second part and last part, handled by `createStore()`

```js
function createStore(reducer) {
    let state = reducer();
    const roots = new Map();
    const prevs = new Map();

    function render() {
        for (const [root, component] of roots) {
            const output = component();

            // Poor man's Virtual DOM implementation :)  Compare the new output
            // with the last output for this root.  Don't trust the current
            // value of root.innerHTML as it may have been changed by other
            // scripts or extensions.
            if (output !== prevs.get(root)) {
                prevs.set(root, root.innerHTML = output);

                // Dispatch an event on the root to give developers a chance to
                // do some housekeeping after the whole DOM is replaced under
                // the root. You can re-focus elements in the listener to this
                // event. See example03.
                root.dispatchEvent(
                    new CustomEvent("render", {detail: state}));
            }
        }
    };

    return {
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect(component) {
            // Return a decorated component function.
            return (...args) => component(state, ...args);
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        },
    };
}
```


When you call `attach()`, it maps a root to an component (generally the main app component). This just implies that the specific component is responsible for the given DOM element, all the rendered content goes under that DOM element.

`connect()` functions mainly like a wrapper that takes the state and passes it on to the component function. You “connect” functions which need to access the global state to render the html string.

Finally we have `render()`, which is called when you do an “attach”, or when there’s a event dispatched. The render function goes through every “root ↔ component” pair, and does the following -

- Gets the rendered output for that component
- Compares to the previously generated output for that DOM node
- If the output is different, update `prevs`, innerHTML of the DOM node.
- Dispatch a custom event in case the application needs to do some housekeeping

That is pretty much it, a very minimalistic and clean library to write small applications without loosing your sanity. Check out the video below (yet to upload) to see and a colleague of mine walk through the source code, you’ll find a longer and more dense explanation there - along with some bad humor.

