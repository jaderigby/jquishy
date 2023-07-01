/*
jQuishy + Children Polyfill
----------------------
Author: Jade C. Rigby
Date: 5/30/2018
Version: 1.1.2
License: MIT
----------------------
*/
[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){null!==this.parentNode&&this.parentNode.removeChild(this)}})}),Array.prototype.forEach||(Array.prototype.forEach=function(t){var e,i;if(null==this)throw new TypeError("this is null or not defined");var o=Object(this),n=o.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(e=arguments[1]),i=0;i<n;){var r;i in o&&(r=o[i],t.call(e,r,i,o)),i++}}),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(t,e){e=e||window;for(var i=0;i<this.length;i++)t.call(e,this[i],i,this)});var jQuishy=function(t){this.t,this.el=t,"string"==typeof t?this.t=document.querySelectorAll(t):t instanceof HTMLCollection?this.t=[].slice.call(t):void 0!==t&&(this.t=[t]),this.items=this.t,this.item=this.t[0]};function paPos(t,e,i){t.forEach(function(t){t.insertAdjacentHTML(e,i)})}function _$(t){return new jQuishy(t)}jQuishy.prototype.first=function(){return this.t=[this.item],this},jQuishy.prototype.attr=function(t,e){var i=[];return this.t.forEach(function(o){if(void 0===e){var n=o.getAttribute(t);i.push(n)}else o.setAttribute(t,e)}),1===i.length?i[0]:i},jQuishy.prototype.css=function(t,e){return this.t.forEach(function(i){var o=[];if(o.push(t),e&&o.push(e),2===o.length)i.style.cssText=o[0]+" : "+o[1];else if(o[0]){var n="";for(var r in o[0]){n+=r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()+":"+o[0][r]+";"}i.style.cssText=n}}),this},jQuishy.prototype.addClass=function(t){return this.t.forEach(function(e){e.classList?e.classList.add(t):e.className+=" "+t}),this},jQuishy.prototype.removeClass=function(t){return this.t.forEach(function(e){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}),this},jQuishy.prototype.toggleClass=function(t){return this.t.forEach(function(e){if(e.classList)e.classList.toggle(t);else{var i=e.className.split(" "),o=i.indexOf(t);o>=0?i.splice(o,1):i.push(t),e.className=i.join(" ")}}),this},jQuishy.prototype.prepend=function(t){return paPos(this.t,"afterbegin",t),this},jQuishy.prototype.append=function(t){return paPos(this.t,"beforeend",t),this},jQuishy.prototype.click=function(t){return this.t.forEach(function(e){e.addEventListener("click",function(e){t(e)})}),this},jQuishy.prototype.delegate=function(t,e,i){return this.t[0].addEventListener(e,function(e){e.target&&e.target.matches(t)&&i(e)}),this},function(){var t=function(t){"children"in t||Object.defineProperty(t,"children",{get:function(){for(var t,e=this.childNodes,i=(e.length,[]),o=0;o<e.length;o++)1===(t=e[o]).nodeType&&i.push(t);return i}})};t(Element.prototype),t(Document.prototype),t(DocumentFragment.prototype)}();

jQuishy.prototype.magicVial = function(useRequiredMessage) {
  _$(this.el +' input[type="submit"], '+ this.el +' #submit').click(function(e) {
    // console.log(this.el +' input[type="submit"]');
    var comprehensiveRequired;
    _$(this.el +' input, '+this.el +' select, '+ this.el +' [data-radio]').items.forEach(function(_item_) {
      // check if passes "validation"
			var validationResult = validation(_item_);

      if (validationResult === 'failed') {
				e.preventDefault();
				errorMessage(_item_);
			}

      _$(_item_.parent.children).items.forEach(function(_item_) {
        console.log("test");
        if (_item_.classList.contains('error-message')) {
          _item_.remove();
        }
      });

      if (validationResult === 'passed') {
				_$(_item_.parent.children).items.forEach(function(_item_) {
          if (_item_.classList.contains('error-message')) {
            _item_.remove();
          }
        });
			}

      // check if passes "required"
			var requiredResult = required(this);

      if (requiredResult === 'failed') {
				e.preventDefault();
				$(this).addClass('is-required');
				requiredMessage(this);
				comprehensiveRequired = 'failed';
			}
    });
  });
  function errorMessage(item) {
		var myMessage;
		// Assign a message
		if (_$(item).attr('data-error-message') && _$(item).attr('data-error-message') !== "") {
			myMessage = '<span class="error-message">'+_$(item).attr('data-error-message')+'</span>';
		}
		else {
			myMessage = '<span class="error-message">Invalid</span>';
		}
		// Check
		if (_$(item).siblings('.error-message')) {
			_$(item).siblings('.error-message').remove();
			_$(item).after(myMessage);
		}
		else {
			_$(item).after(myMessage);
		}
	}

  function validation(item) {
		var errors = 'false';
		var blackSimplePat = /(drop tables|drop table)|(^var[?= ]|^var$)|\<script/;
		var blackNamePat = /(drop tables|drop table)|(^var[?= ]|^var$)|\<script|[\[\<\>\(\)\{\};\=\]]/;
		var blackUsernamePat = /(drop tables|drop table)|(^var[?= ]|^var$)|\<script/;
		var blackPasswordPat = /(drop tables|drop table)|(^var[?= ]|^var$)|\<script/;
		var whitePhonePat = /^[0-9\-\(\)\.]*$/;
		var whiteEmailPat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		switch(_$(item).attr('data-validate')) {
			case 'name':
				if (blackNamePat.test(_$(item).item.value) === true) {
					errors = 'true';
				}
				break;
			case 'simple':
				if (blackSimplePat.test(_$(item).item.value) === true) {
					errors = 'true';
				}
				break;
			case 'email':
				if (whiteEmailPat.test(_$(item).item.value) === false && _$(item).item.value !== "") {
					errors = 'true';
				}
				break;
			case 'username':
				if (blackUsernamePat.test(_$(item).item.value) === true) {
					errors = 'true';
				}
				break;
			case 'password':
				if (blackPasswordPat.test(_$(item).item.value) === true) {
					errors = 'true';
				}
				break;
			case 'phone':
				if (whitePhonePat.test(_$(item).item.value) === false && _$(item).item.value !== "") {
					errors = 'true';
				}
			default:
				break;
		};
		var status;
		(errors === 'true') ? status = 'failed' : status = 'passed';
		if (status === 'failed') {
			_$(item).addClass('failed');
		}
		if (status === 'passed') {
			_$(item).removeClass('failed');
		}
		return status;
	}
  return this;
}
