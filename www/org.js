// Generated by CoffeeScript 1.6.3
/*
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/


(function() {
  var getInnerText, k, org, parseOrgmode, root,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  root = module.exports = require('./base');

  window.org = org = require('org-mode-parser');

  getInnerText = function(node) {
    var newNode;
    newNode = node.cloneNode(true);
    $(newNode).find('[data-org!=""]').remove();
    $(newNode).css('position', 'absolute').css('top', '-1000000');
    document.body;
    return newNode.innerText;
  };

  console.log((function() {
    var _results;
    _results = [];
    for (k in org) {
      _results.push(k);
    }
    return _results;
  })());

  parseOrgmode = function(text, cont) {
    var node;
    return node = org.makelistFromStringWithPerformance(text, cont);
  };

  if ((!(__indexOf.call(document.createElement('a'), 'innerText') >= 0)) && (__indexOf.call(window, 'getSelection') >= 0)) {
    HTMLElement.prototype.__defineGetter__("innerText", function() {
      var i, ranges, selection, str, _i, _j, _ref, _ref1;
      selection = window.getSelection();
      ranges = [];
      str = null;
      for (i = _i = 0, _ref = selection.rangeCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        ranges[i] = selection.getRangeAt(i);
      }
      selection.removeAllRanges();
      selection.selectAllChildren(this);
      str = selection.toString();
      selection.removeAllRanges();
      for (i = _j = 0, _ref1 = ranges.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        selection.addRange(ranges[i]);
      }
      return str;
    });
  }

  root.getInnerText = getInnerText;

  root.parseOrgmode = parseOrgmode;

}).call(this);

/*
//@ sourceMappingURL=org.map
*/
