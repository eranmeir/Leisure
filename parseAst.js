var parseAst = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  parseAst = root = {};
  global = window;
  module = {};
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  Prim = require('./prim');
  
  Prim.runRequire('./prelude');
  Prim.runRequire('./std')
;
  ReplCore = require('./replCore');
  Repl = require('./repl');
}

Prim.loading('parseAst.lsr')


var Nil = Parse.Nil;
var cons = Parse.cons;
var primCons = Parse.primCons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var wrapContext = Leisure.wrapContext;
var markLeisureErrors = Leisure.markLeisureErrors;

module.exports =   (_require()((function(){return "svg"})))
.andThen(
  (_bind()((function(){var $m; return (function(){return $m || ($m = (_forward()((function(){return "notebookSelection"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _forward()((function(){return "notebookAst"}));}))})})())))
.andThenCode(function(){
  _makeNode = Parse.define('makeNode', (function() {var f; return function _makeNode(){return f || (f = (Parse.setDataType(function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return Parse.setType(function(_f){return _f()(_svg)(_width)(_height)(_rootX)(_rootY);}, 'makeNode');};};};};}, 'makeNode')));}})(), 5, "\\svg width height rootX rootY . \\f . f svg width height rootX rootY");;
  _nodeSvg = Parse.define('nodeSvg', (function() {var f; return function _nodeSvg(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _svg();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . svg");;
  _nodeWidth = Parse.define('nodeWidth', (function() {var f; return function _nodeWidth(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _width();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . width");;
  _nodeHeight = Parse.define('nodeHeight', (function() {var f; return function _nodeHeight(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _height();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . height");;
  _nodeRootX = Parse.define('nodeRootX', (function() {var f; return function _nodeRootX(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _rootX();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . rootX");;
  _nodeRootY = Parse.define('nodeRootY', (function() {var f; return function _nodeRootY(){return f || (f = (function(_st){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _rootY();};};};};}))})})());}));}})(), 1, "\\st . st \\svg width height rootX rootY . rootY");;
  _nodeTranslate = Parse.define('nodeTranslate', (function() {var f; return function _nodeTranslate(){return f || (f = (function(_st){return function(_x){return function(_y){return _st()((function(){var $m; return (function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_rootX){return function(_rootY){return _makeNode()((function(){var $m; return (function(){return $m || ($m = (_translate()(_svg)(_x)(_y)))})})())(_width)(_height)((function(){var $m; return (function(){return $m || ($m = (_$o()(_rootX)(_x)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()(_rootY)(_y)))})})());};};};};}))})})());};};}));}})(), 3, "\\st x y . st \\svg width height rootX rootY . makeNode\n  translate svg x y\n  width\n  height\n  rootX + x\n  rootY + y");;
  _nodeLine = Parse.define('nodeLine', (function() {var f; return function _nodeLine(){return f || (f = (function(_n1){return function(_n2){return _n1()((function(){var $m; return (function(){return $m || ($m = (function(_s1){return function(_w1){return function(_h1){return function(_x1){return function(_y1){return _n2()((function(){var $m; return (function(){return $m || ($m = (function(_s2){return function(_w2){return function(_h2){return function(_x2){return function(_y2){return _line()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x1"}))(_x1)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y1"}))(_y1)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x2"}))(_x2)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y2"}))(_y2)))})})())(_defaultLineMap)))})})())))})})())))})})())))})})());};};};};}))})})());};};};};}))})})());};}));}})(), 2, "\\n1 n2 . n1 \\s1 w1 h1 x1 y1 . n2 \\s2 w2 h2 x2 y2 .\n  line [['x1'|x1] ['y1'|y1] ['x2'|x2] ['y2'|y2] | defaultLineMap]");;
  _astFor = Parse.define('astFor', (function() {var f; return function _astFor(){return f || (f = (function(_func){return _isFunc()(_func)((function(){var $m; return (function(){return $m || ($m = (_funcSource()(_func)((function(){var $m; return (function(){return $m || ($m = (function(_src){return _parse()(_src);}))})})())((function(){var $m; return (function(){return $m || ($m = (_right()((function(){return "no source"}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_left()((function(){var $m; return (function(){return $m || ($m = (_lit()(_func)))})})())))})})());}));}})(), 1, "\\func . isFunc func\n  funcSource func (\\src . parse src) (right 'no source')\n  left (lit func)");;
  _treeForNotebook = Parse.define('treeForNotebook', (function() {var f; return function _treeForNotebook(){return f || (f = (function(_func){return _subTreeForNotebook()(_func)((function(){var $m; return (function(){return $m || ($m = (function(_attrs){return function(_ast){return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "onclick"}))((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "Notebook.highlightNotebookFunction('"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_funcName()(_func)(_id)((function(){return ""}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "', "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_astStart()(_ast)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ", "}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_astEnd()(_ast)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return ")"}))(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())))})})())(_attrs);};}))})})());}));}})(), 1, "\\func . subTreeForNotebook func\n  \\attrs ast .\n    [['onclick' | concat[\"Notebook.highlightNotebookFunction('\" (funcName func id '') \"', \" (astStart ast) \", \" (astEnd ast) \")\"]] | attrs]");;
  _subTreeForNotebook = Parse.define('subTreeForNotebook', (function() {var f; return function _subTreeForNotebook(){return f || (f = (function(_func){return function(_attrFunc){return _bind()((function(){var $m; return (function(){return $m || ($m = (_notebookSelection()(_func)))})})())((function(){var $m; return (function(){return $m || ($m = (function(_s){return _bind()((function(){var $m; return (function(){return $m || ($m = (_notebookAst()(_func)))})})())((function(){var $m; return (function(){return $m || ($m = (function(_ast){return _ast()((function(){var $m; return (function(){return $m || ($m = (function(_ast){return _printValue()((function(){var $m; return (function(){return $m || ($m = (_treeForWith()(_ast)((function(){var $m; return (function(){return $m || ($m = (function(_ast){return function(_map){return _attrFunc()((function(){var $m; return (function(){return $m || ($m = (_s()((function(){var $m; return (function(){return $m || ($m = (function(_start){return function(_end){return _shouldHighlight()(_ast)(_start)(_end)((function(){var $m; return (function(){return $m || ($m = (_highlight()(_map)))})})())(_map);};}))})})())(_map)))})})())(_ast);};}))})})())))})})());}))})})())((function(){var $m; return (function(){return $m || ($m = (function(_ignore){return _concat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "no source for "}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_func)(_nil)))})})())))})})());}))})})());}))})})());}))})})());};}));}})(), 2, "\\func attrFunc . do\n  s <- notebookSelection func\n  ast <- notebookAst func\n  ast\n    \\ast . printValue (treeForWith ast \\ast map . attrFunc (s (\\start end . (shouldHighlight ast start end) (highlight map) map) map) ast)\n    \\ignore . concat ['no source for ' func]");;
  _rangeContainsRange = Parse.define('rangeContainsRange', (function() {var f; return function _rangeContainsRange(){return f || (f = (function(_start){return function(_end){return function(_innerStart){return function(_innerEnd){return _and()((function(){var $m; return (function(){return $m || ($m = (_lte()(_start)(_innerStart)))})})())((function(){var $m; return (function(){return $m || ($m = (_lte()(_innerEnd)(_end)))})})());};};};}));}})(), 4, "\\start end innerStart innerEnd . and (lte start innerStart) (lte innerEnd end)");;
  _shouldHighlight = Parse.define('shouldHighlight', (function() {var f; return function _shouldHighlight(){return f || (f = (function(_ast){return function(_start){return function(_end){return function(_aStart){return function(_aEnd){return _or()((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_start)(_end)(_aStart)(_aEnd)))})})())((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_and()((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "lit"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "ref"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_aStart)(_aEnd)(_start)(_end)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_and()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return "lambda"}))((function(){var $m; return (function(){return $m || ($m = (_getType()(_ast)(_id)(_id)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_rangeContainsRange()(_aStart)((function(){var $m; return (function(){return $m || ($m = (_$o()(_aStart)((function(){var $m; return (function(){return $m || ($m = (_strlen()((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_b){return _v();};}))})})())))})})())))})})())))})})())(_start)(_end)))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_astEnd()(_ast)))})})());}((function(){var $m; return (function(){return $m || ($m = (_astStart()(_ast)))})})());};};}));}})(), 3, "\\ast start end . do\n  aStart = astStart ast\n  aEnd = astEnd ast\n  or\n    rangeContainsRange start end aStart aEnd\n    or\n      and\n        or (eq 'lit' (getType ast id id)) (eq 'ref' (getType ast id id))\n        rangeContainsRange aStart aEnd start end\n      and\n        eq 'lambda' (getType ast id id)\n        rangeContainsRange aStart (aStart + (strlen (ast \\v b . v))) start end");;
  _highlight = Parse.define('highlight', (function() {var f; return function _highlight(){return f || (f = (function(_map){return function(_c){return _eq()(_c)((function(){return "#fcc"}))((function(){var $m; return (function(){return $m || ($m = (_addHash()((function(){return "fill"}))((function(){return "red"}))(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_c)((function(){return "#cfc"}))((function(){var $m; return (function(){return $m || ($m = (_addHash()((function(){return "fill"}))((function(){return "green"}))(_map)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_c)((function(){return "#ccf"}))((function(){var $m; return (function(){return $m || ($m = (_addHash()((function(){return "fill"}))((function(){return "blue"}))(_map)))})})())(_map)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_getHashValue()((function(){return "fill"}))(_map)))})})());}));}})(), 1, "\\map . do\n  c = getHashValue 'fill' map\n  eq c '#fcc'\n    addHash 'fill' 'red' map\n    eq c '#cfc'\n      addHash 'fill' 'green' map\n      eq c '#ccf'\n        addHash 'fill' 'blue' map\n        map");;
  _treeForFunc = Parse.define('treeForFunc', (function() {var f; return function _treeForFunc(){return f || (f = (function(_func){return _treeFor()((function(){var $m; return (function(){return $m || ($m = (_parse()((function(){var $m; return (function(){return $m || ($m = (_funcSource()(_func)(_id)(_false)))})})())(_id)(_false)))})})());}));}})(), 1, "\\func . treeFor (parse (funcSource func id false) id false)");;
  _treeFor = Parse.define('treeFor', (function() {var f; return function _treeFor(){return f || (f = (function(_ast){return _treeForWith()(_ast)((function(){var $m; return (function(){return $m || ($m = (function(_ast){return function(_map){return _map();};}))})})());}));}})(), 1, "\\ast . treeForWith ast \\ast map . map");;
  _treeForWith = Parse.define('treeForWith', (function() {var f; return function _treeForWith(){return f || (f = (function(_ast){return function(_mapFunc){return _nodeSvg()((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_ast)(_mapFunc)))})})());};}));}})(), 2, "\\ast mapFunc . nodeSvg (nodeFor ast mapFunc)");;
  _nodeFor = Parse.define('nodeFor', (function() {var f; return function _nodeFor(){return f || (f = (function(_ast){return function(_mapFunc){return function(_t){return _eq()(_t)((function(){return "lit"}))((function(){var $m; return (function(){return $m || ($m = (_createLitNode()(_ast)((function(){var $m; return (function(){return $m || ($m = (_pretty()((function(){var $m; return (function(){return $m || ($m = (_ast()(_id)))})})())))})})())(_mapFunc)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "ref"}))((function(){var $m; return (function(){return $m || ($m = (_createRefNode()(_ast)((function(){var $m; return (function(){return $m || ($m = (_pretty()((function(){var $m; return (function(){return $m || ($m = (_ast()(_id)))})})())))})})())(_mapFunc)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "lambda"}))((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_b){return _createLambdaNode()(_ast)(_v)(_b)(_mapFunc);};}))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_t)((function(){return "apply"}))((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_a){return _createApplyNode()(_ast)(_f)(_a)(_mapFunc);};}))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_makeNode()((function(){var $m; return (function(){return $m || ($m = (_svgNode()((function(){return ""}))))})})())((function(){return 0}))((function(){return 0}))((function(){return 0}))((function(){return 0}))))})})())))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_typeof()(_ast)))})})());};}));}})(), 2, "\\ast mapFunc . do\n  t = typeof ast\n  eq t 'lit'\n    createLitNode ast (pretty (ast id)) mapFunc\n    eq t 'ref'\n      createRefNode ast (pretty (ast id)) mapFunc\n      eq t 'lambda'\n        ast (\\v b . createLambdaNode ast v b mapFunc)\n        eq t 'apply'\n          ast (\\f a . createApplyNode ast f a mapFunc)\n          makeNode (svgNode '') 0 0 0 0");;
  _redStyle = Parse.define('redStyle', (function _redStyle() {return ((_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){return "black"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){return "#fcc"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "rx"}))((function(){return 8}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "ry"}))((function(){return 8}))))})})())(_nil)))})})())))})})())))})})())))})})())));}), 0, "[['stroke'|'black'] ['stroke-width'|2] ['fill'|'#fcc'] ['rx'|8] ['ry'|8]]");;
  _greenStyle = Parse.define('greenStyle', (function _greenStyle() {return ((_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){return "black"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){return "#cfc"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "rx"}))((function(){return 8}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "ry"}))((function(){return 8}))))})})())(_nil)))})})())))})})())))})})())))})})())));}), 0, "[['stroke'|'black'] ['stroke-width'|2] ['fill'|'#cfc'] ['rx'|8] ['ry'|8]]");;
  _blueStyle = Parse.define('blueStyle', (function _blueStyle() {return ((_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke"}))((function(){return "black"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "stroke-width"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "fill"}))((function(){return "#ccf"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "rx"}))((function(){return 8}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "ry"}))((function(){return 8}))))})})())(_nil)))})})())))})})())))})})())))})})())));}), 0, "[['stroke'|'black'] ['stroke-width'|2] ['fill'|'#ccf'] ['rx'|8] ['ry'|8]]");;
  _createLambdaNode = Parse.define('createLambdaNode', (function() {var f; return function _createLambdaNode(){return f || (f = (function(_ast){return function(_v){return function(_b){return function(_mapFunc){return function(_rootBox){return function(_varBox){return function(_bodyTree){return function(_childWidth){return function(_totalWidth){return function(_pad){return function(_rootBox){return function(_varBox){return function(_bodyTree){return _makeNode()((function(){var $m; return (function(){return $m || ($m = (_svgConcat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeLine()(_rootBox)(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeLine()(_rootBox)(_bodyTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_bodyTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_rootBox)))})})())(_nil)))})})())))})})())))})})())))})})())))})})())))})})())(_totalWidth)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_max()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_bodyTree)))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_bodyTree)((function(){var $m; return (function(){return $m || ($m = (_$o()(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_varBox)))})})())((function(){return 5}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_varBox)(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_rootBox)((function(){var $m; return (function(){return $m || ($m = (_$_()((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_rootBox)))})})())((function(){return 2}))))})})())))})})())((function(){return 0}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_$_()(_totalWidth)(_childWidth)))})})())((function(){return 2}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()(_childWidth)((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_rootBox)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_varBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_bodyTree)))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_b)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())(_v)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())((function(){return "lambda"}))))})})());};};};}));}})(), 4, "\\ast v b mapFunc . do\n  rootBox = textNode (mapFunc ast greenStyle) 'lambda'\n  varBox = textNode (mapFunc ast greenStyle) v\n  bodyTree = nodeFor b mapFunc\n  childWidth = (nodeWidth varBox) + 5 + (nodeWidth bodyTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  varBox = nodeTranslate varBox pad (nodeHeight rootBox) + 5\n  bodyTree = nodeTranslate bodyTree (pad + (nodeWidth varBox) + 5) ((nodeHeight rootBox) + 5)\n  makeNode\n    svgConcat [(nodeLine rootBox varBox) (nodeLine rootBox bodyTree) (nodeSvg varBox) (nodeSvg bodyTree) (nodeSvg rootBox)]\n    totalWidth\n    (nodeHeight rootBox) + 5 + (max (nodeHeight varBox) (nodeHeight bodyTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2");;
  _createApplyNode = Parse.define('createApplyNode', (function() {var f; return function _createApplyNode(){return f || (f = (function(_ast){return function(_f){return function(_a){return function(_mapFunc){return function(_rootBox){return function(_funcTree){return function(_argTree){return function(_childWidth){return function(_totalWidth){return function(_pad){return function(_rootBox){return function(_funcTree){return function(_argTree){return _makeNode()((function(){var $m; return (function(){return $m || ($m = (_svgConcat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeLine()(_rootBox)(_funcTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeLine()(_rootBox)(_argTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_rootBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_funcTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_nodeSvg()(_argTree)))})})())(_nil)))})})())))})})())))})})())))})})())))})})())))})})())(_totalWidth)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_max()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_argTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_funcTree)))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_argTree)((function(){var $m; return (function(){return $m || ($m = (_$o()(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_funcTree)))})})())((function(){return 5}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_funcTree)(_pad)((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeHeight()(_rootBox)))})})())((function(){return 5}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeTranslate()(_rootBox)((function(){var $m; return (function(){return $m || ($m = (_$_()((function(){var $m; return (function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_rootBox)))})})())((function(){return 2}))))})})())))})})())((function(){return 0}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$f()((function(){var $m; return (function(){return $m || ($m = (_$_()(_totalWidth)(_childWidth)))})})())((function(){return 2}))))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_max()(_childWidth)((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_rootBox)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_argTree)))})})())((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_nodeWidth()(_funcTree)))})})())))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_a)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_nodeFor()(_f)(_mapFunc)))})})());}((function(){var $m; return (function(){return $m || ($m = (_textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_blueStyle)))})})())((function(){return "apply"}))))})})());};};};}));}})(), 4, "\\ast f a mapFunc . do\n  rootBox = textNode (mapFunc ast blueStyle) 'apply'\n  funcTree = nodeFor f mapFunc\n  argTree = nodeFor a mapFunc\n  childWidth = (nodeWidth argTree) + 5 + (nodeWidth funcTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  funcTree = nodeTranslate funcTree pad (nodeHeight rootBox) + 5\n  argTree = nodeTranslate argTree (pad + (nodeWidth funcTree) + 5) ((nodeHeight rootBox) + 5)\n  makeNode\n    svgConcat [(nodeLine rootBox funcTree) (nodeLine rootBox argTree) (nodeSvg rootBox) (nodeSvg funcTree) (nodeSvg argTree)]\n    totalWidth\n    (nodeHeight rootBox) + 5 + (max (nodeHeight argTree) (nodeHeight funcTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2");;
  _createRefNode = Parse.define('createRefNode', (function() {var f; return function _createRefNode(){return f || (f = (function(_ast){return function(_ref){return function(_mapFunc){return _textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_redStyle)))})})())(_ref);};};}));}})(), 3, "\\ast ref mapFunc . textNode (mapFunc ast redStyle) ref");;
  _createLitNode = Parse.define('createLitNode', (function() {var f; return function _createLitNode(){return f || (f = (function(_ast){return function(_lit){return function(_mapFunc){return _textNode()((function(){var $m; return (function(){return $m || ($m = (_mapFunc()(_ast)(_greenStyle)))})})())(_lit);};};}));}})(), 3, "\\ast lit mapFunc . textNode (mapFunc ast greenStyle) lit");;
  _textNode = Parse.define('textNode', (function() {var f; return function _textNode(){return f || (f = (function(_map){return function(_txt){return _svgMeasureText()(_txt)((function(){return ""}))((function(){var $m; return (function(){return $m || ($m = (function(_w){return function(_h){return function(_nodeW){return function(_nodeH){return _makeNode()((function(){var $m; return (function(){return $m || ($m = (_svgConcat()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_rect()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y"}))((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "width"}))(_nodeW)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "height"}))(_nodeH)))})})())(_map)))})})())))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_text()(_txt)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "pointer-events"}))((function(){return "none"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "text-anchor"}))((function(){return "middle"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "dominant-baseline"}))((function(){return "mathematical"}))))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "x"}))((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 14}))((function(){var $m; return (function(){return $m || ($m = (_$f()(_w)((function(){return 2}))))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "y"}))((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return (function(){return $m || ($m = (_$f()(_h)((function(){return 2}))))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "font-weight"}))((function(){return "bold"}))))})})())(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})())(_nil)))})})())))})})())))})})())(_nodeW)(_nodeH)((function(){var $m; return (function(){return $m || ($m = (_$f()(_nodeW)((function(){return 2}))))})})())((function(){var $m; return (function(){return $m || ($m = (_$f()(_nodeH)((function(){return 2}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()(_h)((function(){return 14}))))})})());}((function(){var $m; return (function(){return $m || ($m = (_$o()(_w)((function(){return 24}))))})})());};}))})})());};}));}})(), 2, "\\map txt . (svgMeasureText txt '') \\w h . do\n  nodeW = w + 24\n  nodeH = h + 14\n  makeNode\n    (svgConcat [(rect [['x'|2] ['y'|2] ['width'|nodeW] ['height'|nodeH] | map]) (text txt [['pointer-events' | 'none'] ['text-anchor'|\"middle\"] ['dominant-baseline'|\"mathematical\"] ['x'| 14 + w / 2] ['y'| 5 + h / 2] ['font-weight'|'bold']])])\n    nodeW\n    nodeH\n    nodeW / 2\n    nodeH / 2");;
  _typeof = Parse.define('typeof', (function() {var f; return function _typeof(){return f || (f = (function(_x){return _getType()(_x)(_id)(_false);}));}})(), 1, "\\x . getType x id false");;

});
if (typeof window != 'undefined') Prim.runMonad(module.exports, Prim.defaultEnv, function(){});
}).call(this)