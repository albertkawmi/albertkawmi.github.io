---
layout: post
title: A CSS reset for forms
tags:
    - css
    - design
---

[Meyer's famous CSS reset][1] is an excellent starting point, but it doesn't do much for forms. I found this snippet buried in a forum thread on CSS Tricks and found it pretty useful.

I'm reposting it here because the original has messy spacing and some redundant selectors, so I've cleaned it up:

```css
/* CSS Forms Reset */
textarea,
select,
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"] {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-background-clip: padding;
    -moz-background-clip: padding;
    background-clip: padding-box;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    -ms-border-radius: 0;
    -o-border-radius: 0;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: #fff;
    color: #000;
    outline: 0;
    margin: 0;
    padding: 0;
    text-align: left;
    font-size: 1em;
    height: 1em;
    vertical-align: middle;
}

select {
    background: #fff url(data:image/png;base64,R0lGODlhDQAEAIAAAAAAAP8A/yH5BAEHAAEALAAAAAANAAQAAAILhA+hG5jMDpxvhgIAOw==);
    background-repeat: no-repeat;
    background-position: 97% center;
    padding: 0 25px 0 8px;
    font-size: .875em
}
```
Source: [CSS Tricks](https://css-tricks.com/forums/topic/a-reset-for-forms/#post-130162)

Note that the `select` styling may not be what you want - it adds a small triangle element as its `background`. I found it particularly helpful in a Phonegap application because it kept a consistent feel for the select box across Android and iOS.

[1]: http://meyerweb.com/eric/tools/css/reset/ "Meyer's CSS Reset"
