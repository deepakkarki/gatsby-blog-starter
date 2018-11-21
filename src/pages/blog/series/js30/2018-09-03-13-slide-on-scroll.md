---
layout: post
title: Slide in on scroll
desc: >
  This is the 13th project of Wes Bos's JS30 series. We'll be building an image slide in animation which is triggered by scroll.
author:
  name: "Deepak Karki"
published: true
date: 2018-09-03
part: 13
---


This is the 13th project of Wes Bos's [JS30 series](https://javascript30.com/friend/DISCOVERDEV). To see the **whole 30 part series**, [click here](../)
We'll be building an image slide in animation which is triggered by scroll.

Here is the video -

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/uzRsENVD3W8' frameborder='0' allowfullscreen></iframe></div>

And here are the starter files -

<iframe height='465' scrolling='no' title='JS30-13-slide-scroll-a' src='//codepen.io/deepakkarki/embed/aKYjPw/?height=265&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/aKYjPw/'>JS30-13-slide-scroll-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


The general algorithm is as follows

1. Capture the scroll event data
2. For each image
  1. Calculate the position wrt the page
  2. Inspect the image's height and check if more than half of it should be on screen
  3. If so make it visible


Now one thing to note is that the scroll event will fire hundreds of times on a scroll, so we need a debounce function.

```js
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
```

`debounce()` is a closure that ensures that even though it is called as many times as possible, the call to `func()` will go through only once every wait milliseconds.

Now the code we have to write,


## Capture scroll data

```js
const sliderImages = document.querySelectorAll('.slide-in')
function checkSlide() {
}
window.addEventListener('scroll', debounce(checkSlide));
```

All the images we want to animate have `.slide-in` property. 

```css
.slide-in {
  opacity:0;
  transition:all .5s;
}
.align-left.slide-in {
  transform:translateX(-30%) scale(0.95);
}
.align-right.slide-in {
  transform:translateX(30%) scale(0.95);
}
```

The property ensures that the image is completely transparent and has a `0.5s` transition. Based on whether the image is to the left or right it has a slight offset (left is moved further left, right further right).


## Calculate the positions

The image should disappear once the half point of the image scrolls into view, or when the image scrolls out of view from the top. `window.scrollY` gives us the number of px scrolled beyond the top. If you haven't scrolled at all, it'll be zero. `window.innerHeight` gives us the height of the viewport. So `scrollY + innerHeight` gives us the number of px that has come into the viewport (or scrolled past it). `sliderImage.height` is the height of the image.

`sliderImage.offsetTop` is the distance of the top of the image from top of the page in px. 

```js
function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const isHalfShown =  (window.scrollY + window.innerHeight) > 
                         (sliderImage.offsetTop +sliderImage.height / 2);

    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isNotScrolledPast = window.scrollY < imageBottom;

    // if more that half is over the scroll view *and* it hasn't scrolled out of view
    if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add('active');
    } else {
        sliderImage.classList.remove('active');
    }
  });
}
```

Now to see if half is shown, we get the total length that has been scrolled into view (from top) = `window.scrollY + window.innerHeight` and then see if thats greater than the top of the image + half it's height, `sliderImage.offsetTop +sliderImage.height / 2`. 

Also we have to check that the image hasn't scrolled pass the top so we see if the top position is lesser that the image's bottom position, `window.scrollY < imageBottom`.

If both these conditions are met, then the CSS class `active` is added to the image, which animates it into view. If either of them aren't met, the class is removed!


Here is the final code :

<iframe height='465' scrolling='no' title='JS30-13-slide-scroll-a' src='//codepen.io/deepakkarki/embed/LrmYve/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/deepakkarki/pen/LrmYve/'>JS30-13-slide-scroll-a</a> by Deepak Karki (<a href='https://codepen.io/deepakkarki'>@deepakkarki</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>