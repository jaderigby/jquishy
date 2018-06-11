/*
jQuishy
----------------------
Author: Jade C. Rigby
Date: 6/11/2018
Version: 1.2.0
License: MIT
----------------------
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

// ============== "Array forEach" Polyfill ==============
//
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback/*, thisArg*/) {

    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat while k < len.
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator.
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c.
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined.
  };
}
// ======================================================

// ============== "NodeList forEach" Polyfill ==============
//
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
// ======================================================

var jQuishy = function(el) {
	this.t;
	if (typeof el === 'string') {
		this.t = document.querySelectorAll(el);
	}
	else if (el instanceof HTMLCollection) {
		this.t = [].slice.call(el);
	}
	else if (el !== undefined) {
		this.t = [el];
	}

	this.items = this.t;
	this.item = this.t[0];
	this.vanilla = (this.t.length === 1) ? this.t[0] : this.t;
}

jQuishy.prototype.first = function() {
	this.t = [this.item];
	return this;
}

jQuishy.prototype.attr = function(desc, value) {
	var valList = [];
	(this.t).forEach( function(_item_) {
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
	(this.t).forEach( function(_item_) {
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

jQuishy.prototype.hasClass = function(cls) {
	if (this.t[0].classList) {
		return this.t[0].classList.contains(cls);
	}
	else {
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.t[0].className);
	}
}

jQuishy.prototype.addClass = function(cls) {
	(this.t).forEach( function(_item_) {
		(_item_.classList) ? _item_.classList.add(cls) : _item_.className += ' ' + cls;
	});
	return this;
}

jQuishy.prototype.removeClass = function(cls) {
	(this.t).forEach( function(_item_) {
		if (_item_.classList) {
			_item_.classList.remove(cls);
		} else {
			_item_.className = _item_.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	});
	return this;
}

jQuishy.prototype.toggleClass = function(cls) {
	(this.t).forEach( function(_item_) {
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

function paPos(titems, where, str) {
	(titems).forEach( function(_item_) {
		_item_.insertAdjacentHTML(where, str);
	});
}

jQuishy.prototype.prepend = function(str) {
	paPos(this.t, 'afterbegin', str);
	return this;
}

jQuishy.prototype.append = function(str) {
	paPos(this.t, 'beforeend', str);
	return this;
}

jQuishy.prototype.click = function(func) {
	(this.t).forEach( function(_item_) {
		_item_.addEventListener('click', function(evt) {
			func(evt);
		});
	});
	return this;
}

jQuishy.prototype.delegate = function(desc, evtType, func) {
	this.t[0].addEventListener(evtType, function(evt) {
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
