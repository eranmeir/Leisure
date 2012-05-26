var block = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  block = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Leisure = require('./leisure');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

var setType = Leisure.setType;
var setDataType = Leisure.setDataType;
var define = Leisure.define;
var defineMacro = Leisure.defineMacro;
var defineToken = Leisure.defineToken;
var processResult = Repl.processResult;

var _LEFT_ARROW, _UP_ARROW, _RIGHT_ARROW, _DOWN_ARROW, _startBlocky, _runPhysics, _key, _down, _up, _jsPD;
//LEFT_ARROW = AST(37)
root.defs._LEFT_ARROW = _LEFT_ARROW = define('LEFT_ARROW', 37, 0, " 37");
;
//UP_ARROW = AST(38)
root.defs._UP_ARROW = _UP_ARROW = define('UP_ARROW', 38, 0, " 38");
;
//RIGHT_ARROW = AST(39)
root.defs._RIGHT_ARROW = _RIGHT_ARROW = define('RIGHT_ARROW', 39, 0, " 39");
;
//DOWN_ARROW = AST(40)
root.defs._DOWN_ARROW = _DOWN_ARROW = define('DOWN_ARROW', 40, 0, " 40");
;
//startBlocky = AST(\e . bind startPhysics \_ . runPhysics)
root.defs._startBlocky = _startBlocky = define('startBlocky', function(_e){return _bind()(_startPhysics)((function(){var $m; return function(){return $m || ($m = (function(__){return _runPhysics()}))}})())}, 1, "\\e. do\n  startPhysics\n  runPhysics");
;
//runPhysics = AST(bind (js ([ Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3))) ])) \_ . bind stepPhysics \_ . bind (js ([ Notebook.update("app") ])) \_ . runPhysics)
root.defs._runPhysics = _runPhysics = define('runPhysics', _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3)))"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()(_stepPhysics)((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Notebook.update(\"app\")"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _runPhysics()}))}})())}))}})())}))}})()), 0, " do\n  js ['Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3)))']\n  stepPhysics\n  js ['Notebook.update(\"app\")']\n  runPhysics");
;
//key = AST(\e . eq (eventType e) keydown (down e) (up e))
root.defs._key = _key = define('key', function(_e){return _eq()((function(){var $m; return function(){return $m || ($m = (_eventType()(_e)))}})())((function(){return "keydown"}))((function(){var $m; return function(){return $m || ($m = (_down()(_e)))}})())((function(){var $m; return function(){return $m || ($m = (_up()(_e)))}})())}, 1, "\\e. eq (eventType e) 'keydown'\n  down e\n  up e");
;
//down = AST(\e . (\c . bind (js ([ Blocky.touchingGround(Blocky.block) ? _true() : _false() ])) \tg . tg (eq c LEFT_ARROW (jsPD e ([ Blocky.moveBlockBy(-50) ])) (eq c RIGHT_ARROW (jsPD e ([ Blocky.moveBlockBy(50) ])) (eq c UP_ARROW (jsPD e ([ Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100) ])) false))) false) (eventKeyCode e))
root.defs._down = _down = define('down', function(_e){return function(_c){return _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Blocky.touchingGround(Blocky.block) ? _true() : _false()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(_tg){return _tg()((function(){var $m; return function(){return $m || ($m = (_eq()(_c)(_LEFT_ARROW)((function(){var $m; return function(){return $m || ($m = (_jsPD()(_e)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Blocky.moveBlockBy(-50)"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_c)(_RIGHT_ARROW)((function(){var $m; return function(){return $m || ($m = (_jsPD()(_e)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Blocky.moveBlockBy(50)"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_c)(_UP_ARROW)((function(){var $m; return function(){return $m || ($m = (_jsPD()(_e)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100)"}))(_$s)))}})())))}})())(_false)))}})())))}})())))}})())(_false)}))}})())}((function(){var $m; return function(){return $m || ($m = (_eventKeyCode()(_e)))}})())}, 1, "\\e. do\n  c = eventKeyCode e\n  tg <- js ['Blocky.touchingGround(Blocky.block) ? _true() : _false()']\n  tg\n    eq c LEFT_ARROW\n      jsPD e ['Blocky.moveBlockBy(-50)']\n      eq c RIGHT_ARROW\n        jsPD e ['Blocky.moveBlockBy(50)']\n        eq c UP_ARROW\n          jsPD e ['Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100)']\n          false\n    false");
;
//up = AST(\e . false)
root.defs._up = _up = define('up', function(_e){return _false()}, 1, "\\e. false");
;
//jsPD = AST(\e jsCode . bind (eventPreventDefault e) \_ . js jsCode)
root.defs._jsPD = _jsPD = define('jsPD', function(_e){return function(_jsCode){return _bind()((function(){var $m; return function(){return $m || ($m = (_eventPreventDefault()(_e)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _js()(_jsCode)}))}})())}}, 2, "\\e. \\jsCode. do\n  eventPreventDefault e\n  js jsCode");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)