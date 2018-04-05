/*
Author: Jade C. Rigby
Date: 4/2/2018
Version: 0.1.2
 License: MIT

jQuishy is designed to take either a css string descriptor or a node object
EXAMPLE:

- string
_$('#container ul li:first-child').addClass('active');

- node
var myNode = document.getElementById('#container');
_$(myNode).css('display', 'block');
*/
function _$(el) {
	var target;
	if (typeof el === 'string') {
		target = document.querySelectorAll(el);
	}
	else if (el !== undefined) {
		target = [el];
	}
	if (target !== undefined) {
		return {
			attr : (desc, value) => {
				var valList = [];
				(target).forEach( (_item_) => {
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
			},
			css : (arg1, arg2) => {
				(target).forEach( (_item_) => {
					var args = [];
					args.push(arg1);
					(arg2) ? args.push(arg2) : null;
					// console.log("arguments: ", args);
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
			},
			addClass : (cls) => {
				(target).forEach( (_item_) => {
					(_item_.classList) ? _item_.classList.add(cls) : _item_.className += ' ' + cls;
				});
			},
			removeClass : (cls) => {
				(target).forEach( (_item_) => {
					if (_item_.classList) {
						_item_.classList.remove(cls);
					} else {
						_item_.className = _item_.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
					}
				});
			},
			toggleClass : (cls) => {
        (target).forEach( (_item_) => {
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
      },
			append : (str) => {
				(target).forEach( (_item_) => {
					_item_.insertAdjacentHTML('beforeend', str);
				});
			},
			delegate : (desc, evt, func) => {
				target[0].addEventListener(evt, (e) => {
					if (e.target && e.target.matches(desc)) {
	   				func();
					}
				});
			},
			items : target,
			item : target[0]
		}
	}
	else { return };
}
