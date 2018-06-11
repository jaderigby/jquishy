# jQuishy

jQuishy is a superficial replacement for jQuery.  It offers many of the most common features (sans ajax) used in jQuery. In many projects, this will give you exactly what you need.  Use it, as a replacement for the full jQuery library.  Below, you can see a list of features, and a description of attributes utilized.  If it fits the parameters of your project, I encourage you to use it with its under 3kb footprint.

## Usage

`_$('#container').css("display", "block");`

__Note:__ Notice that you can replace your existing jQuery declarations by adding an underscore to the front of your jQuery prefixes. In other words, "$" becomes "\_$".

## Helpers ##

- items
- item
- vanilla

## Features

- first
- remove
- attr
- css
- hasClass
- addClass
- removeClass
- toggleClass
- prepend
- append
- click
- delegate

## Selectors

jQuishy can take several types of objects for its first parameter, ie, "selector".

- __string:__ <br />`_$('#container ul li:first-child').addClass('active');`

- __Node:__ <br />
`var myNode = document.getElementById('#container');` <br />
`_$(myNode).css('display', 'block');`

- __NodeList:__ <br /> `var myNodeList = document.querySelectorAll('.navigation li');` <br />
`_$(myNodeList).removeClass('active');`

- __HTMLCollection:__ <br /> `_$(e.target.parent.children).removeClass('active');`

__Note:__ HTMLCollections are transformed into Arrays.

## Native Output Features

Since jQuishy works with native objects (Nodes, NodeLists, HTMLCollections), you may want to chain normal JS methods onto jQuishy.  Well, you can!  The following returns the objects you need:

- _$().items = all items matching selector
- _$().item = first, or only item matching selector

Example:

```
<div class="wrapper">
...
</div>
<div class="wrapper">
...
</div>
<script>
  _$('.wrapper').items.forEach(function(_item_) {
    _$(_item_).addClass("post-entry");
  });
</script>
```

## Polyfills

jQuishy includes the following Polyfills:

- Array.forEach
- NodeList.forEach
- .remove

## Attributes

jQuishy uses the following JavaScript attributes:

- querySelectorAll
- insertAdjacentHTML (prepending, appending)
- classList (add, remove, toggle)

Take note of these features in deciding if this library is appropriate for your project.  In general, support for this library exists in all modern browsers, and from IE10 and up.  IE9 and up can be supported with the addition of the following shim, or similar: 'https://github.com/eligrey/classList.js/blob/master/classList.js'
Without the shim, all features but 'addClass', 'toggleClass', and 'removeClass' still work.

## Take jQuishy Further ##

### Detach ###

__Code:__

```
jQuishy.prototype.detach = function() {
  var item = this.t[0];
  item.remove();
  return item.outerHTML || new XMLSerializer().serializeToString(item);
}
```

__Usage:__

```
_$('.modal.window').items.forEach(function(_modal_) {
  var thisModal = _$(_modal_).detach();
  _$('#modalViewport').prepend(thisModal);
});
```

### Window scrollTop ###

__Code:__

```
function windowScrollTop() {
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  return top;
}
```

__Usage:__

```
var scrollTop = windowScrollTop();
```
