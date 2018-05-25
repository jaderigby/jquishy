/*
Author: Jade C. Rigby
Date: 5/24/2018
Version: 0.3.1
License: MIT

jQuishy is designed to take either a css string descriptor, a Nodelist, an HTMLCollection (gets converted to an Array), or a node object
EXAMPLE:

- string
_$('#container ul li:first-child').addClass('active');

- HTMLCollection
_$(e.target.parent.children).removeClass('active');

- node
var myNode = document.getElementById('#container');
_$(myNode).css('display', 'block');
*/

// ============== "Remove" Polyfill (IE9+) ==============
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
	arr.forEach(function (item) {
		if (item.hasOwnProperty('remove')) {
			return;
		}
		Object.defineProperty(item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				if (this.parentNode !== null)
					this.parentNode.removeChild(this);
			}
		});
	});
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
// ======================================================

function _$(el) {
	this.target;
	if (typeof el === 'string') {
		this.target = document.querySelectorAll(el);
	}
	else if (el instanceof HTMLCollection) {
		this.target = [].slice.call(el);
	}
	else if (el !== undefined) {
		this.target = [el];
	}
	if (!(this instanceof _$)) {
    return new _$(el);
  }
	this.items = this.target;
	this.first = this.target[0];
	this.item = this.first;
}

_$.prototype.items = function() {
	this.items = this.target;
	return this;
}

_$.prototype.attr = function(desc, value) {
  var valList = [];
  (target).forEach( function(_item_) {
    if (value === undefined) {
      var val = _item_.getAttribute(desc);
      valList.push(val);
    }
    else {
      _item_.setAttribute(desc, value);
    }
  });
  if (valList.length === 1) {
    return valList[0];
  }
  else {
    return valList;
  };
}

_$.prototype.css = function(arg1, arg2) {
	(target).forEach( function(_item_) {
		var args = [];
		args.push(arg1);
		(arg2) ? args.push(arg2) : null;
		if (args.length === 2) {
			_item_.style.cssText = args[0] +" : "+ args[1];
		}
		else if (args[0]) {
			var attributeString = '';
			for (var key in args[0]) {
				var keyString = key.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
				var newAttribute = keyString +":"+ args[0][key] +";";
				attributeString += newAttribute;
			}
			_item_.style.cssText = attributeString;
		}
	});
}

_$.prototype.addClass = function(cls) {
	(target).forEach( function(_item_) {
		(_item_.classList) ? _item_.classList.add(cls) : _item_.className += ' ' + cls;
	});
}

_$.prototype.removeClass = function(cls) {
	(target).forEach( function(_item_) {
		if (_item_.classList) {
			_item_.classList.remove(cls);
		} else {
			_item_.className = _item_.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	});
}

_$.prototype.toggleClass = function(cls) {
	(target).forEach( function(_item_) {
		if (_item_.classList) {
			_item_.classList.toggle(cls);
		} else {
			var classes = _item_.className.split(' ');
			var existingIndex = classes.indexOf(cls);

			if (existingIndex >= 0) {
				classes.splice(existingIndex, 1);
			} else {
				classes.push(cls);
			}
			_item_.className = classes.join(' ');
		}
	});
}

_$.prototype.append = function(str) {
	(target).forEach( function(_item_) {
		_item_.insertAdjacentHTML('beforeend', str);
	});
}

_$.prototype.click = function(func) {
	(target).forEach( function(_item_) {
		_item_.addEventListener('click', function(evt) {
			func(evt);
		});
	});
}

_$.prototype.delegate = function(desc, evtType, func) {
	target[0].addEventListener(evtType, function(evt) {
		if (evt.target && evt.target.matches(desc)) {
			func(evt);
		}
	});
}
// The following line is used for testing, and can be ignored
// module.exports = _$;
