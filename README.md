# jQuishy

jQuishy is a superficial replacement for jQuery.  It offers many of the most common features (sans ajax) used in jQuery. In many projects, this will give you exactly what you need.  Use it, as a replacement for the full jQuery library.  Below, you can see a list of features, and a description of attributes utilized.  If it fits the parameters of your project, I encourage you to use it with its under 3kb footprint.

## Usage

`_$('#container').css("display", "block");`

__Note:__ Notice that you can replace your existing jQuery declarations by adding an underscore to the front of your jQuery prefixes. In other words, "$" becomes "\_$".

## Features

- remove
- attr
- css
- addClass
- removeClass
- toggleClass
- append
- click
- delegate

## Polyfills

- Array.forEach
- NodeList.forEach
- remove

## Attributes

jQuishy uses the following JavaScript attributes:

- querySelectorAll
- insertAdjacentHTML (appending)
- classList (add, remove, toggle)

Take note of these features in deciding if this library is appropriate for your project.  In general, support for this library exists in all modern browsers, and from IE10 and up.  IE9 and up can be supported with the addition of the following shim, or similar: 'https://github.com/eligrey/classList.js/blob/master/classList.js'
Without the shim, all features but 'addClass', 'toggleClass', and 'removeClass' still work.
