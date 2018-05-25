/*
Author: Jade C. Rigby
Date: 5/24/2018
Version: 1.0.0
License: MIT

jQuishy is now built for chaining!
Also, added support for "first()"

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

var jQuishy = function(el) {
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

	this.items = this.target;
	this.item = this.target[0];
}

jQuishy.prototype.first = function() {
	this.target = [this.item];
	return this;
}

jQuishy.prototype.attr = function(desc, value) {
	var valList = [];
	(this.target).forEach( function(_item_) {
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

jQuishy.prototype.css = function(arg1, arg2) {
	(this.target).forEach( function(_item_) {
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
	return this;
}

jQuishy.prototype.addClass = function(cls) {
	(this.target).forEach( function(_item_) {
		(_item_.classList) ? _item_.classList.add(cls) : _item_.className += ' ' + cls;
	});
	return this;
}

jQuishy.prototype.removeClass = function(cls) {
	(this.target).forEach( function(_item_) {
		if (_item_.classList) {
			_item_.classList.remove(cls);
		} else {
			_item_.className = _item_.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	});
	return this;
}

jQuishy.prototype.toggleClass = function(cls) {
	(this.target).forEach( function(_item_) {
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
	return this;
}

jQuishy.prototype.append = function(str) {
	(this.target).forEach( function(_item_) {
		_item_.insertAdjacentHTML('beforeend', str);
	});
	return this;
}

jQuishy.prototype.click = function(func) {
	(this.target).forEach( function(_item_) {
		_item_.addEventListener('click', function(evt) {
			func(evt);
		});
	});
	return this;
}

jQuishy.prototype.delegate = function(desc, evtType, func) {
	this.target[0].addEventListener(evtType, function(evt) {
		if (evt.target && evt.target.matches(desc)) {
			func(evt);
		}
	});
	return this;
}

function _$(el) {
		return new jQuishy(el);
}
// The following line is used for testing, and can be ignored
// module.exports = _$;
