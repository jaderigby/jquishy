/*
Author: Jade C. Rigby
Date: 4/2/2018
Version: 0.1.1
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
	let target;
	if (typeof el === 'string') {
		target = document.querySelectorAll(el);
	}
	else if (el !== undefined) {
		target = [el];
	}
	if (target !== undefined) {
		return {
			attr : (desc, value) => {
				let valList = [];
				(target).forEach( (_item_) => {
					if (value === undefined) {
						let val = _item_.getAttribute(desc);
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
			css : (...args) => {
				(target).forEach( (_item_) => {
					if (args.length === 2) {
						_item_.style.cssText = `${args[0]} : ${args[1]}`;
					}
					else if (args[0].constructor === Object) {
						let attributeString = '';
						for (let key in args[0]) {
							let keyString = key.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
							let newAttribute = `${keyString} : ${args[0][key]};`;
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
				if (cls.classList) {
				  cls.classList.toggle(className);
				} else {
				  var classes = cls.className.split(' ');
				  var existingIndex = classes.indexOf(className);

				  if (existingIndex >= 0) {
						classes.splice(existingIndex, 1);
					} else {
						classes.push(className);
					}
				  cls.className = classes.join(' ');
				}
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
