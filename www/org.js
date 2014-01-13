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
  var DRAWER_BOILERPLATE, DRAWER_NAME, Drawer, END_NAME, HL_LEVEL, HL_PRIORITY, HL_TAGS, HL_TODO, HTML, HTML_START_NAME, Headline, KW_BOILERPLATE, KW_INFO, KW_NAME, Keyword, LINK_DESCRIPTION, LINK_HEAD, LINK_INFO, LIST_BOILERPLATE, LIST_CHECK, LIST_CHECK_VALUE, LIST_INFO, LIST_LEVEL, Link, ListItem, Meat, Node, RES_NAME, Results, SRC_BOILERPLATE, SRC_INFO, SRC_NAME, SimpleMarkup, Source, XListItem, buildHeadlineRE, checkMatch, drawerRE, endRE, fullLine, headlineRE, htmlEndRE, htmlStartRE, keywordRE, linkRE, listContentOffset, listRE, markupText, markupTypes, matchLine, parseDrawer, parseHeadline, parseHtmlBlock, parseKeyword, parseList, parseMeat, parseOrgChunk, parseOrgMode, parseRestOfMeat, parseResults, parseSrcBlock, parseTags, resultsLineRE, resultsRE, root, simpleRE, srcEndRE, srcStartRE, tagsRE, todoKeywords, todoRE,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = module.exports;

  todoKeywords = ['TODO', 'DONE'];

  buildHeadlineRE = function() {
    return new RegExp('^(\\*+) *(' + todoKeywords.join('|') + ')?(?: *(?:\\[#(A|B|C)\\]))?[^\\n]*?((?:[\\w@%#]*:[\\w@%#:]*)? *)$', 'm');
  };

  HL_LEVEL = 1;

  HL_TODO = 2;

  HL_PRIORITY = 3;

  HL_TAGS = 4;

  headlineRE = buildHeadlineRE();

  todoRE = /^(\*+) *(TODO|DONE)/;

  tagsRE = /:[^:]*/;

  KW_BOILERPLATE = 1;

  KW_NAME = 2;

  KW_INFO = 3;

  keywordRE = /^(#\+([^:\n][^\n]*): *)([^\n]*)$/im;

  SRC_BOILERPLATE = 1;

  SRC_NAME = 2;

  SRC_INFO = 3;

  srcStartRE = /^(#\+(BEGIN_SRC) *)([^\n]*)$/im;

  END_NAME = 1;

  srcEndRE = /^#\+(END_SRC)( *)$/im;

  RES_NAME = 1;

  resultsRE = /^#\+(RESULTS): *$/im;

  resultsLineRE = /^([:|] .*)(?:\n|$)/i;

  DRAWER_BOILERPLATE = 1;

  DRAWER_NAME = 2;

  drawerRE = /^:([^\n:]*): *$/im;

  endRE = /^:END: *$/im;

  LIST_LEVEL = 1;

  LIST_BOILERPLATE = 2;

  LIST_CHECK = 3;

  LIST_CHECK_VALUE = 4;

  LIST_INFO = 5;

  listRE = /^( *)(- *)(\[( |X)\] +)?(.*)$/m;

  simpleRE = /\B(\*[/+=~\w](.*?[/+=~\w])?\*|\/[*+=~\w](.*?[*+=~\w])?\/|\+[*/=~\w](.*?[*/=~\w])?\+|=[+*/~\w](.*?[+*/~\w])?=|~[=+*/\w](.*?[=+*/\w])?~)(\B|$)|\b_[^_]*\B_(\b|$)/;

  LINK_HEAD = 1;

  LINK_INFO = 2;

  LINK_DESCRIPTION = 3;

  linkRE = /(\[\[([^\]]*)\])(?:\[([^\]]*)\])?\]/;

  HTML_START_NAME = 1;

  htmlStartRE = /^#\+(BEGIN_HTML) *$/im;

  htmlEndRE = /^#\+END_HTML *$/im;

  matchLine = function(txt) {
    return checkMatch(txt, srcStartRE, 'srcStart') || checkMatch(txt, srcEndRE, 'srcEnd') || checkMatch(txt, resultsRE, 'results') || checkMatch(txt, keywordRE, 'keyword') || checkMatch(txt, headlineRE, function(m) {
      return "headline-" + m[HL_LEVEL].length;
    }) || checkMatch(txt, listRE, 'list') || checkMatch(txt, htmlStartRE, 'htmlStart') || checkMatch(txt, htmlEndRE, 'htmlEnd');
  };

  checkMatch = function(txt, pat, result) {
    var m;
    m = txt.match(pat);
    if ((m != null ? m.index : void 0) === 0) {
      if (typeof result === 'string') {
        return result;
      } else {
        return result(m);
      }
    } else {
      return false;
    }
  };

  Node = (function() {
    function Node() {
      this.markup = markupText(this.text);
    }

    Node.prototype.length = function() {
      return this.text.length;
    };

    Node.prototype.end = function() {
      return this.offset + this.text.length;
    };

    Node.prototype.toJson = function() {
      return JSON.stringify(this.toJsonObject(), null, "  ");
    };

    Node.prototype.allText = function() {
      return this.text;
    };

    Node.prototype.block = false;

    Node.prototype.findNodeAt = function(pos) {
      if (this.offset <= pos && pos < this.offset + this.text.length) {
        return this;
      } else {
        return null;
      }
    };

    Node.prototype.scan = function(func) {
      return func(this);
    };

    Node.prototype.scanWithChildren = function(func) {
      var c, _i, _len, _ref, _results;
      func(this);
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        _results.push(c.scan(func));
      }
      return _results;
    };

    Node.prototype.linkNodes = function() {
      return this;
    };

    Node.prototype.next = null;

    Node.prototype.prev = null;

    Node.prototype.top = function() {
      if (!this.parent) {
        return this;
      } else {
        return this.parent.top();
      }
    };

    Node.prototype.toString = function() {
      return this.toJson();
    };

    Node.prototype.allTags = function() {
      var _ref, _ref1;
      return (_ref = (_ref1 = this.parent) != null ? _ref1.allTags() : void 0) != null ? _ref : [];
    };

    return Node;

  })();

  Headline = (function(_super) {
    __extends(Headline, _super);

    function Headline(text, level, todo, priority, tags, children, offset) {
      this.text = text;
      this.level = level;
      this.todo = todo;
      this.priority = priority;
      this.tags = tags;
      this.children = children;
      this.offset = offset;
      Headline.__super__.constructor.call(this);
    }

    Headline.prototype.block = true;

    Headline.prototype.lowerThan = function(l) {
      return l < this.level;
    };

    Headline.prototype.length = function() {
      return this.end() - this.offset;
    };

    Headline.prototype.end = function() {
      var lastChild;
      if (this.children.length) {
        lastChild = this.children[this.children.length - 1];
        return lastChild.offset + lastChild.length();
      } else {
        return Headline.__super__.end.call(this);
      }
    };

    Headline.prototype.type = 'headline';

    Headline.prototype.toJsonObject = function() {
      var c;
      return {
        type: this.type,
        text: this.text,
        offset: this.offset,
        level: this.level,
        todo: this.todo,
        priority: this.priority,
        tags: this.tags,
        children: (function() {
          var _i, _len, _ref, _results;
          _ref = this.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            _results.push(c.toJsonObject());
          }
          return _results;
        }).call(this)
      };
    };

    Headline.prototype.allText = function() {
      var c;
      return this.text + ((function() {
        var _i, _len, _ref, _results;
        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push(c.allText());
        }
        return _results;
      }).call(this)).join('');
    };

    Headline.prototype.findNodeAt = function(pos) {
      var child, res, _i, _len, _ref;
      if (pos < this.offset || this.offset + this.length() < pos) {
        return null;
      } else if (pos < this.offset + this.text.length) {
        return this;
      } else {
        _ref = this.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (res = child.findNodeAt(pos)) {
            return res;
          }
        }
        return null;
      }
    };

    Headline.prototype.scan = Node.prototype.scanWithChildren;

    Headline.prototype.linkNodes = function() {
      var c, prev, _i, _len, _ref;
      prev = null;
      _ref = this.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        c.linkNodes();
        c.parent = this;
        c.prev = prev;
        if (prev) {
          prev.next = c;
        }
        prev = c;
      }
      return this;
    };

    Headline.prototype.addTags = function(set) {
      var tag, _i, _len, _ref;
      _ref = parseTags(this.tags);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        set[tag] = true;
      }
      return set;
    };

    Headline.prototype.addAllTags = function() {
      var _ref;
      return this.addTags(((_ref = this.parent) != null ? _ref.addAllTags() : void 0) || {});
    };

    Headline.prototype.allTags = function() {
      var k, _results;
      _results = [];
      for (k in this.addAllTags()) {
        _results.push(k);
      }
      return _results;
    };

    return Headline;

  })(Node);

  Meat = (function(_super) {
    __extends(Meat, _super);

    function Meat(text, offset) {
      this.text = text;
      this.offset = offset;
      Meat.__super__.constructor.call(this);
    }

    Meat.prototype.lowerThan = function(l) {
      return true;
    };

    Meat.prototype.type = 'meat';

    Meat.prototype.toJsonObject = function() {
      return {
        type: this.type,
        text: this.text,
        offset: this.offset
      };
    };

    return Meat;

  })(Node);

  markupTypes = {
    "*": 'bold',
    "/": 'italic',
    "_": 'underline',
    "=": 'verbatim',
    "~": 'code',
    "+": 'strikethrough'
  };

  SimpleMarkup = (function(_super) {
    __extends(SimpleMarkup, _super);

    function SimpleMarkup(text, offset, children) {
      this.text = text;
      this.offset = offset;
      this.children = children;
      this.markupType = markupTypes[this.text[0]];
    }

    SimpleMarkup.prototype.type = 'simple';

    SimpleMarkup.prototype.toJsonObject = function() {
      var c;
      return {
        type: this.type,
        text: this.text,
        offset: this.offset,
        markupType: this.markupType,
        children: (function() {
          var _i, _len, _ref, _results;
          _ref = this.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            _results.push(c.toJsonObject());
          }
          return _results;
        }).call(this)
      };
    };

    SimpleMarkup.prototype.scan = Node.prototype.scanWithChildren;

    return SimpleMarkup;

  })(Meat);

  Link = (function(_super) {
    __extends(Link, _super);

    function Link(text, offset, path, children) {
      this.text = text;
      this.offset = offset;
      this.path = path;
      this.children = children;
    }

    Link.prototype.type = 'link';

    Link.prototype.toJsonObject = function() {
      var c;
      return {
        type: this.type,
        text: this.text,
        offset: this.offset,
        path: this.path,
        children: (function() {
          var _i, _len, _ref, _results;
          _ref = this.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            _results.push(c.toJsonObject());
          }
          return _results;
        }).call(this)
      };
    };

    Link.prototype.scan = Node.prototype.scanWithChildren;

    return Link;

  })(Meat);

  XListItem = (function(_super) {
    __extends(XListItem, _super);

    function XListItem(text, offset, contentOffset, level, checked, info) {
      this.text = text;
      this.offset = offset;
      this.contentOffset = contentOffset;
      this.level = level;
      this.checked = checked;
      this.info = info;
      XListItem.__super__.constructor.call(this, this.text, this.offset);
    }

    XListItem.prototype.type = 'list';

    XListItem.prototype.toJsonObject = function() {
      var obj;
      obj = {
        type: this.type,
        text: this.text,
        level: this.level,
        offset: this.offset,
        contentOffset: this.contentOffset,
        info: this.info
      };
      if (this.checked != null) {
        obj.checked = this.checked;
      }
      return obj;
    };

    XListItem.prototype.getParent = function() {
      var li;
      if (this.level === 0) {
        null;
      }
      li = this;
      while (li = li.getPreviousListItem()) {
        if (li.level < this.level) {
          return li;
        }
      }
    };

    XListItem.prototype.getPreviousListItem = function() {
      var prev;
      prev = this.prev;
      while (prev && !(prev instanceof Headline) && !(prev instanceof ListItem)) {
        prev = prev.prev;
      }
      if (prev instanceof ListItem) {
        return prev;
      } else {
        return null;
      }
    };

    XListItem.prototype.getNextListItem = function() {
      var next;
      next = this.next;
      while (next && !(next instanceof Headline) && !(next instanceof ListItem)) {
        next = next.next;
      }
      if (next instanceof ListItem) {
        return next;
      } else {
        return null;
      }
    };

    return XListItem;

  })(Meat);

  ListItem = (function(_super) {
    __extends(ListItem, _super);

    function ListItem(text, offset, level, checked, contentOffset, children) {
      this.text = text;
      this.offset = offset;
      this.level = level;
      this.checked = checked;
      this.contentOffset = contentOffset;
      this.children = children;
      ListItem.__super__.constructor.call(this, this.text, this.offset);
    }

    ListItem.prototype.type = 'list';

    ListItem.prototype.toJsonObject = function() {
      var child, obj;
      obj = {
        type: this.type,
        text: this.text,
        level: this.level,
        offset: this.offset,
        contentOffset: this.contentOffset,
        children: (function() {
          var _i, _len, _ref, _results;
          _ref = this.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(child.toJsonObject());
          }
          return _results;
        }).call(this)
      };
      if (this.checked != null) {
        obj.checked = this.checked;
      }
      return obj;
    };

    ListItem.prototype.getParent = function() {
      var li;
      if (this.level === 0) {
        null;
      }
      li = this;
      while (li = li.getPreviousListItem()) {
        if (li.level < this.level) {
          return li;
        }
      }
    };

    ListItem.prototype.getPreviousListItem = function() {
      var prev;
      prev = this.prev;
      while (prev && !(prev instanceof Headline) && !(prev instanceof ListItem)) {
        prev = prev.prev;
      }
      if (prev instanceof ListItem) {
        return prev;
      } else {
        return null;
      }
    };

    ListItem.prototype.getNextListItem = function() {
      var next;
      next = this.next;
      while (next && !(next instanceof Headline) && !(next instanceof ListItem)) {
        next = next.next;
      }
      if (next instanceof ListItem) {
        return next;
      } else {
        return null;
      }
    };

    ListItem.prototype.scan = Node.prototype.scanWithChildren;

    return ListItem;

  })(Meat);

  Drawer = (function(_super) {
    __extends(Drawer, _super);

    function Drawer(text, offset, contentPos, endPos) {
      this.text = text;
      this.offset = offset;
      this.contentPos = contentPos;
      this.endPos = endPos;
      Drawer.__super__.constructor.call(this, this.text, this.offset);
    }

    Drawer.prototype.type = 'drawer';

    Drawer.prototype.toJsonObject = function() {
      return {
        type: this.type,
        text: this.text,
        offset: this.offset,
        contentPos: this.contentPos,
        endPos: this.endPos
      };
    };

    Drawer.prototype.leading = function() {
      return this.text.substring(0, this.contentPos);
    };

    Drawer.prototype.content = function() {
      return this.text.substring(this.contentPos, this.endPos);
    };

    Drawer.prototype.trailing = function() {
      return this.text.substring(this.endPos);
    };

    Drawer.prototype.name = function() {
      var n;
      n = this.leading().trim();
      return n.substring(1, n.length - 1);
    };

    return Drawer;

  })(Meat);

  Keyword = (function(_super) {
    __extends(Keyword, _super);

    function Keyword(text, offset, name, info) {
      this.text = text;
      this.offset = offset;
      this.name = name;
      this.info = info;
      Keyword.__super__.constructor.call(this, this.text, this.offset);
    }

    Keyword.prototype.block = true;

    Keyword.prototype.type = 'keyword';

    Keyword.prototype.toJsonObject = function() {
      return {
        type: this.type,
        text: this.text,
        offset: this.offset,
        name: this.name,
        info: this.info
      };
    };

    return Keyword;

  })(Meat);

  Source = (function(_super) {
    __extends(Source, _super);

    function Source(text, offset, name, info, infoPos, content, contentPos) {
      this.text = text;
      this.offset = offset;
      this.name = name;
      this.info = info;
      this.infoPos = infoPos;
      this.content = content;
      this.contentPos = contentPos;
      Source.__super__.constructor.call(this, this.text, this.offset, this.name, this.info);
    }

    Source.prototype.type = 'source';

    Source.prototype.toJsonObject = function() {
      return {
        type: this.type,
        text: this.text,
        offset: this.offset,
        name: this.name,
        info: this.info,
        infoPos: this.infoPos,
        content: this.content,
        contentPos: this.contentPos
      };
    };

    return Source;

  })(Keyword);

  HTML = (function(_super) {
    __extends(HTML, _super);

    function HTML(text, offset, name, contentStart, contentLength) {
      this.text = text;
      this.offset = offset;
      this.name = name;
      this.contentStart = contentStart;
      this.contentLength = contentLength;
      HTML.__super__.constructor.call(this, this.text, this.offset, this.name);
    }

    HTML.prototype.type = 'html';

    HTML.prototype.leading = function() {
      return this.text.substring(0, this.contentStart);
    };

    HTML.prototype.trailing = function() {
      return this.text.substring(this.contentStart + this.contentLength);
    };

    HTML.prototype.content = function() {
      return this.text.substring(this.contentStart, this.contentStart + this.contentLength);
    };

    HTML.prototype.toJsonObject = function() {
      return {
        type: this.type,
        text: this.text,
        offset: this.offset,
        contentStart: this.contentStart,
        contentLength: this.contentLength
      };
    };

    return HTML;

  })(Keyword);

  Results = (function(_super) {
    __extends(Results, _super);

    function Results(text, offset, name, contentPos) {
      this.text = text;
      this.offset = offset;
      this.name = name;
      this.contentPos = contentPos;
      Results.__super__.constructor.call(this, this.text, this.offset, this.name);
    }

    Results.prototype.type = 'results';

    Results.prototype.toJsonObject = function() {
      return {
        type: this.type,
        text: this.text,
        offset: this.offset,
        name: this.name,
        contentPos: this.contentPos
      };
    };

    return Results;

  })(Keyword);

  parseOrgMode = function(text, offset) {
    var res, rest, _ref;
    _ref = parseHeadline('', offset != null ? offset : 0, 0, void 0, void 0, void 0, text, text.length), res = _ref[0], rest = _ref[1];
    if (rest.length) {
      throw new Error("Text left after parsing: " + rest);
    }
    return res.linkNodes();
  };

  parseHeadline = function(text, offset, level, todo, priority, tags, rest, totalLen) {
    var child, children, oldRest, _ref;
    children = [];
    while (true) {
      oldRest = rest;
      _ref = parseOrgChunk(rest, totalLen - rest.length + offset, level), child = _ref[0], rest = _ref[1];
      if (!child) {
        break;
      }
      if (child.lowerThan(level)) {
        while (child) {
          children.push(child);
          child = child.next;
        }
      } else {
        rest = oldRest;
      }
    }
    return [new Headline(text, level, todo, priority, tags || '', children, offset), rest];
  };

  parseTags = function(text) {
    var t, tagArray, _i, _len, _ref;
    tagArray = [];
    _ref = (text ? text.split(':') : []);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      t = _ref[_i];
      if (t) {
        tagArray.push(t);
      }
    }
    return tagArray;
  };

  fullLine = function(match, text) {
    return text.substring(match.index, match.index + match[0].length + (text[match.index + match[0].length] === '\n' ? 1 : 0));
  };

  parseOrgChunk = function(text, offset, level) {
    var line, m, meat;
    if (!text) {
      return [null, text];
    } else {
      m = text.match(headlineRE);
      if ((m != null ? m.index : void 0) === 0) {
        if (m[HL_LEVEL].length <= level) {
          return [null, text];
        } else {
          line = fullLine(m, text);
          return parseHeadline(line, offset, m[HL_LEVEL].length, m[HL_TODO], m[HL_PRIORITY], m[HL_TAGS], text.substring(line.length), offset + text.length);
        }
      } else {
        meat = text.substring(0, m ? m.index : text.length);
        return parseMeat(meat, offset, text.substring(meat.length));
      }
    }
  };

  parseMeat = function(meat, offset, rest, middleOfLine) {
    var child, children, drawer, end, first, htmlStart, inside, insideOffset, keyword, line, link, list, newRest, node, results, simple, srcStart, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    srcStart = meat.match(srcStartRE);
    keyword = meat.match(keywordRE);
    results = meat.match(resultsRE);
    list = meat.match(listRE);
    simple = meat.match(simpleRE);
    link = meat.match(linkRE);
    htmlStart = meat.match(htmlStartRE);
    drawer = meat.match(drawerRE);
    if (!middleOfLine) {
      if ((results != null ? results.index : void 0) === 0) {
        line = fullLine(results, meat);
        return parseResults(line, offset, meat.substring(line.length) + rest);
      } else if ((srcStart != null ? srcStart.index : void 0) === 0) {
        line = fullLine(srcStart, meat);
        return parseSrcBlock(line, offset, srcStart[SRC_INFO], srcStart[SRC_BOILERPLATE].length, meat.substring(line.length) + rest);
      } else if ((keyword != null ? keyword.index : void 0) === 0) {
        line = fullLine(keyword, meat);
        return parseKeyword(keyword, line, offset, keyword[KW_NAME], keyword[KW_INFO], meat.substring(line.length) + rest);
      } else if ((list != null ? list.index : void 0) === 0) {
        line = fullLine(list, meat);
        return parseList(list, line, offset, (_ref = (_ref1 = list[LIST_LEVEL]) != null ? _ref1.length : void 0) != null ? _ref : 0, list[LIST_CHECK_VALUE], list[LIST_INFO], meat.substring(line.length) + rest);
      } else if ((htmlStart != null ? htmlStart.index : void 0) === 0) {
        line = fullLine(htmlStart, meat);
        return parseHtmlBlock(line, offset, meat.substring(line.length) + rest);
      } else if ((drawer != null ? drawer.index : void 0) === 0) {
        line = fullLine(drawer, meat);
        newRest = meat.substring(line.length) + rest;
        if (end = newRest.match(endRE)) {
          return parseDrawer(line, offset, end, newRest);
        }
      }
    }
    if ((simple != null ? simple.index : void 0) === 0) {
      inside = simple[0].substring(1, simple[0].length - 1);
      insideOffset = offset + 1;
      children = [];
      while (inside) {
        _ref2 = parseMeat(inside, insideOffset, '', true), child = _ref2[0], inside = _ref2[1];
        while (child) {
          children.push(child);
          insideOffset = child.offset + child.text.length;
          child = child.next;
        }
      }
      node = new SimpleMarkup(simple[0], offset, children);
    } else if ((link != null ? link.index : void 0) === 0) {
      inside = link[LINK_DESCRIPTION];
      insideOffset = offset + link[LINK_HEAD].length;
      children = [];
      while (inside) {
        _ref3 = parseMeat(inside, insideOffset, '', true), child = _ref3[0], inside = _ref3[1];
        while (child) {
          children.push(child);
          insideOffset = child.offset + child.text.length;
          child = child.next;
        }
      }
      node = new Link(link[0], offset, link[LINK_INFO], children);
    } else {
      first = meat.length + offset;
      first = Math.min(first, (_ref4 = srcStart != null ? srcStart.index : void 0) != null ? _ref4 : first, (_ref5 = keyword != null ? keyword.index : void 0) != null ? _ref5 : first, (_ref6 = results != null ? results.index : void 0) != null ? _ref6 : first, (_ref7 = list != null ? list.index : void 0) != null ? _ref7 : first, (_ref8 = simple != null ? simple.index : void 0) != null ? _ref8 : first, (_ref9 = link != null ? link.index : void 0) != null ? _ref9 : first, (_ref10 = htmlStart != null ? htmlStart.index : void 0) != null ? _ref10 : first);
      node = new Meat(meat.substring(0, first), offset);
    }
    meat = meat.substring(node.text.length);
    return parseRestOfMeat(node, meat, rest);
  };

  parseRestOfMeat = function(node, meat, rest) {
    var node2, _ref;
    if (meat && node.text[node.text.length - 1] !== '\n') {
      _ref = parseMeat(meat, node.offset + node.allText().length, rest, true), node2 = _ref[0], rest = _ref[1];
      node.next = node2;
      return [node, rest];
    } else {
      return [node, meat + rest];
    }
  };

  parseResults = function(text, offset, rest) {
    var lines, m, oldRest;
    oldRest = rest;
    while (m = rest.match(resultsLineRE)) {
      rest = rest.substring(m[0].length);
    }
    lines = oldRest.substring(0, oldRest.length - rest.length);
    return [new Results(text + lines, offset, text.match(resultsRE)[RES_NAME], text.length), rest];
  };

  parseDrawer = function(text, offset, end, rest) {
    var pos;
    pos = end.index + (fullLine(end, rest)).length;
    return [new Drawer(text + rest.substring(0, pos), offset, text.length, text.length + end.index), rest.substring(pos)];
  };

  parseKeyword = function(match, text, offset, name, info, rest) {
    return [new Keyword(text, offset, name, text.substring(match[KW_BOILERPLATE].length)), rest];
  };

  parseSrcBlock = function(text, offset, info, infoPos, rest) {
    var end, endLine, line, otherSrcStart;
    end = rest.match(srcEndRE);
    otherSrcStart = rest.match(srcStartRE);
    if (!end || (otherSrcStart && otherSrcStart.index < end.index)) {
      line = text.match(/^.*\n/);
      if (!line) {
        line = [text];
      }
      return [new Meat(line[0]), text.substring(line[0].length) + rest];
    } else {
      endLine = fullLine(end, rest);
      return [new Source(text + rest.substring(0, end.index + endLine.length), offset, text.match(srcStartRE)[SRC_NAME], info, infoPos, rest.substring(0, end.index), offset + text.length), rest.substring(end.index + endLine.length)];
    }
  };

  parseHtmlBlock = function(text, offset, rest) {
    var end, endLine, line, otherHtmlStart;
    end = rest.match(htmlEndRE);
    otherHtmlStart = rest.match(htmlStartRE);
    line = text.match(/^.*\n/);
    if (!line) {
      line = [text];
    }
    if (!end || (otherHtmlStart && otherHtmlStart.index < end.index)) {
      return [new Meat(line[0]), text.substring(line[0].length) + rest];
    } else {
      endLine = fullLine(end, rest);
      return [new HTML(text + rest.substring(0, end.index + endLine.length), offset, text.match(htmlStartRE)[HTML_START_NAME], line[0].length, text.length + end.index - line[0].length), rest.substring(end.index + endLine.length)];
    }
  };

  parseList = function(match, text, offset, level, check, info, rest) {
    var children, contentOffset, inside, insideOffset, node, _ref;
    contentOffset = listContentOffset(match);
    insideOffset = offset + contentOffset;
    inside = text.substring(contentOffset);
    children = [];
    while (inside) {
      console.log("PARSING: " + inside);
      _ref = parseMeat(inside, insideOffset, '', true), node = _ref[0], inside = _ref[1];
      while (node) {
        children.push(node);
        insideOffset += node.allText().length;
        node = node.next;
      }
    }
    return [new ListItem(text, offset, level, check === 'X' || (check === ' ' ? false : null), contentOffset, children), rest];
  };

  listContentOffset = function(match) {
    var _ref, _ref1;
    return match[LIST_LEVEL].length + match[LIST_BOILERPLATE].length + ((_ref = (_ref1 = match[LIST_CHECK]) != null ? _ref1.length : void 0) != null ? _ref : 0);
  };

  markupText = function(text) {};

  root.parseOrgMode = parseOrgMode;

  root.Headline = Headline;

  root.Meat = Meat;

  root.Keyword = Keyword;

  root.Source = Source;

  root.HTML = HTML;

  root.Results = Results;

  root.resultsRE = resultsRE;

  root.ListItem = ListItem;

  root.SimpleMarkup = SimpleMarkup;

  root.Link = Link;

  root.Drawer = Drawer;

  root.drawerRE = drawerRE;

  root.headlineRE = headlineRE;

  root.HL_TAGS = HL_TAGS;

  root.parseTags = parseTags;

  root.matchLine = matchLine;

  root.keywordRE = keywordRE;

  root.KW_BOILERPLATE = KW_BOILERPLATE;

  root.KW_NAME = KW_NAME;

  root.srcStartRE = srcStartRE;

  root.SRC_BOILERPLATE = SRC_BOILERPLATE;

  root.SRC_INFO = SRC_INFO;

}).call(this);

/*
//@ sourceMappingURL=org.map
*/
