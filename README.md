# jQuishy

jQuishy is a superficial replacement for jQuery.  It offers the most common, in my experience, features (sans ajax) used in jQuery. In many projects, this will give you the minimum capabilities needed.  Use it, as a replacement for the full jQuery library.  Below, you can see a list of features, and a description of attributes utilized.  If it fits the parameters of your project, I encourage you to use it with its 2kb footprint.

## Usage

`_$('#container').css("display", "block");`

__Note:__ Notice that you can replace your existing jQuery declarations by replacing the jQuery prefix "$" with "\_$", thus making it easy to convert over.

## Features

- attr
- css
- addClass
- removeClass
- toggleClass
- append
- click
- delegate

## Attributes

jQuishy uses the following JavaScript attributes:

- forEach array method (ES5)
- querySelectorAll
- insertAdjacentHTML (appending)
- classList (add, remove, toggle)

Take note of these features in deciding if this library is appropriate for your project.  In general, support for this library exists in all modern browsers, and from IE10 and up.  IE9 and up can be supported with the addition of the following shim, or similar: 'https://github.com/eligrey/classList.js/blob/master/classList.js'
Without the shim, all features but 'addClass', 'toggleClass', and 'removeClass' still work.
