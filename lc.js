/*
Copyright (C) 2011, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

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

var LC = (function() {
var lcons
var lfalse
var exprs = {}
var order = []
var lambdas = {}
var funcCount = 1
var hashed = {}
var L = null
var historyCount = 0
var history = []
var tokens = {}
var groupOpens = {'(': ')'}
var groupCloses = {')': 1}
var tokenPat = null
var specials = '[]().*+?'
var tokenDefPat = /^ *([^ ]+) *(=[.)]=|=\([^=]+=|=)(?:[^=])/

function loadDefs(defs) {
	var d = defs.split('\n')

	LC.exprs = exprs = {}
	LC.code = {}
	lambdas = {}
	hashed = {}
	LC.order = order = []
	funcCount = 1
	hashed = {}
	LC.L = L = null
	for (var index in d) {
	    evalLine(d[index].trim(), true)
	}
	constructEnv()
	findCons();
}
function defineToken(name, def) {
	if (def != '=') {
		tokens[name] = 1
		tokenPat = null
		if (def[1] == '(') {
			groupOpens[name] = def.substring(2, def.length - 1)
		} else if (def[1] == ')') {
			groupCloses[name] = 1
		}
	}
}
function evalLine(line, noRebuild) {
	if (line != "" && line[0] != '#') {
		var def = line.match(tokenDefPat)
		var name = def ? def[1].trim() : null

		if (def) {
			defineToken(name, def[2])
			line = line.substring(def[0].length).trim()
		}
		return addExpr(name, line, noRebuild)
	}
	return false
}
function addExpr(name, txt, noRebuild) {
	if (name) {
		var expr = new Entry(name, parse(txt))
		var newOutput = ''

		if (!noRebuild) {
			for (var i = 0; i < order.length; i++) {
				if (order[i].name == name) {
					order.splice(i, 1)
				}
			}
		}
		LC.L = L = null
		order.push(expr)
		exprs[name] = expr
		var hk = expr.expr.hashKey()
		if (!hashed[hk]) hashed[hk] = expr
		return true
	} else {
		runExpr(txt.trim())
		return false
	}
}
function findCons() {
	if (L._cons) {
		lcons = L._cons().lambda.body.body
		lfalse = L._false().lambda
	}
}
function runFunc(index) {
	runCode(order[index].expr, order[index].code)
}
function runExpr(str) {
	var expr = parse(str)

	runCode(expr, constructEnv('function() {\nreturn ' + expr.ret([]).join("") + '\n}'))
}
function runCode(expr, code) {
	var res

	LC.historyExprs[historyCount] = expr
	try {
		constructEnv()
		history[historyCount] = res = code()
	} catch (err) {
		res = "Error: " + err.message
	}
	LC.resultCode(expr, res, historyCount)
	historyCount++
	LC.L = L = null
}
function isCons(l) {return l.lambda.id == lcons.id}
function isFalse(l) {return l.lambda.id == lfalse.id}
function pretty(l) {
	var lam = l.lambda

	return lam && lam.id == lcons.id ? '[' + elements(l, true) + ']' : lam ? lam.format() : l
}
function elements(l, first) {
	return isFalse(l) ? '' : ((first ? '' : ', ') + pretty(Lhead(l)) + elements(Ltail(l), false))
}
function constructEnv(src) {
	if (!L || src) {
		var env = ['(function(){\n']

		for (var i = 0; i < order.length; i++) {
			if (order[i].name != "") {
				env.push('\n// ' + order[i].name + ' = ' + order[i].expr.format(true, true))
			}
			env.push('LC.code[order[' + i + '].name] = order[' + i + '].code = ' + order[i].src)
			if (order[i].name != "") {
				env.push("var " + order[i].cname + ' = ' + 'order[' + i + '].code')
				env.push("L." + order[i].cname + " = " + order[i].cname)
			}
		}
		for (var i = 0; i < history.length; i++) {
			env.push("var _" + charCodes['$'] + i + " = function(){return history[" + i + "]}")
		}
		if (history.length > 0) {
			env.push("var _" + charCodes['$'] + " = function(){return history[" + (history.length - 1) + "]}")
		}
		if (src) {
			env.push('return (' + src + ')')
		}
		env.push('\n})()')
		LC.L = L = {}
		var res
		try {
			res = eval(env.join("\n"))
		} catch (err) {
			res = "ERROR: " + err.message
		}
		return res
	}
}
function addToken(tok, group) {
	var pat = ''

	tokens[tok] = group
	tokenPat = null
}
function createTokenPat() {
	if (!tokenPat) {
		var types = []

		for (var i in tokens) {
			types.push(i)
		}
		// sort them by length, longest first
		types.sort(function(a, b) {b.length - a.length})
		for (var i = 0; i < types.length; i++) {
			var s = types[i]
			var o = ''

			for (var p = 0; p < s.length; p++) {
				if (specials.indexOf(s[p]) > -1) {
					o += '\\'
				}
				o += s[p]
			}
			types[i] = o
		}
		types.push('[().\\\\]| +')
		tokenPat = new RegExp(types.join('|'))
	}
}
function tokenize(str) {
	var pos = 0
	var toks = []

	str = str.replace(/\u03BB/g, '\\')
	createTokenPat()
	while (str.length && (pos = str.search(tokenPat)) > -1) {
		if (pos > 0) {
			toks.push(str.substring(0, pos))
		}
		var tok = tokenPat.exec(str.substring(pos))[0]
		if (tok.trim()) {
			toks.push(tok)
		}
		str = str.substring(pos + tok.length)
	}
	if (str.length) {
		toks.push(str)
	}
	return toks
}
function parse(str) {return tparse(tokenize(str).reverse(), {})}
function tparse(toks, vars, expr) {
	var cur
	var oldVars = {}

	while (toks.length) {
		var tok = toks.pop()

		if (tok == ')') {
			toks.push(tok)
			return expr
		}
		if (tok == '\\') {
			cur = tparseLambda(toks, vars)
		} else {
			var expectedClose = groupOpens[tok]
			var skip = false

			if (expectedClose) {
				cur = tparse(toks, vars, tok != '(' ? tparseVariable(tok, vars, oldVars) : null)
				var last = toks[toks.length - 1]
				if (!toks.length || last != expectedClose) {
					throw new Error('unbalanced group, expected "' + expectedClose + '", but got "' + last + '"')
				}
				toks.pop()
				skip = true
			}
			if (!skip) {
				cur = tparseVariable(tok, vars, oldVars)
			}
		}
		expr = expr ? new Apply(expr, cur) : cur
		if (groupCloses[tok]) {
			toks.push(tok)
			return expr
		}
	}
	for (i in oldVars) {
		vars[i] = oldVars[i]
	}
	return expr
}
function tparseVariable(tok, vars, oldVars) {
	var cur = vars[tok]
	if (!cur) {
		cur = new Variable(tok, true)
		if (vars[tok]) oldVars[tok] = vars[tok]
		vars[tok] = cur
	}
	return cur
}
function tparseLambda(toks, vars) {
	var name, old, body, lvar

	if (toks.length < 3 || toks[toks.length - 1] == '.') {
		throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '))
	}
	if (toks[toks.length - 2] == '.') {
		name = toks.pop()
		old = vars[name]
		lvar = vars[name] = new Variable(name, false)
		toks.pop()
		body = tparse(toks, vars)
	} else {
		name = toks.pop()
		old = vars[name]
		lvar = vars[name] = new Variable(name, false)
		body = tparseLambda(toks, vars)
	}
	vars[name] = old
	return new Lambda(lvar, body)
}
function Entry(name, expr) {
	this.name = name
	this.cname = nameSub(name)
	this.expr = expr
	if (expr) {
		try {
			this.src = 'function() {\nreturn ' + expr.ret([]).join("") + '\n}'
		} catch (err) {
			this.src = function() {return "Error compiling: " + expr}
		}
	}
}
Entry.prototype = {
	toString: function() {return this.expr && this.expr.format(false)},
	formatSlash: function(nosubs) {return this.expr.format(true, nosubs)},
	names: function() {this.expr.names()},
	alphaConvert: function() {return new Entry(this.name, this.expr.alphaConvert())},
	betaReduce: function() {return new Entry(this.name, this.expr.betaReduce())},
	etaConvert: function() {return new Entry(this.name, this.expr.etaConvert())},
	normalize: function() {return new Entry(this.name, this.expr.normalize())},
	globalSub: function() {return new Entry(this.name, this.expr.globalSub())},
}

function reduce(expr, ecallback, acallback, bcallback) {
	var prev = expr

	for (var count = 0; count < 1000; count++) {
		var ec = prev.etaConvert()
		var ac = ec.alphaConvert()
		var bc = ac.betaReduce()

		if (!ec.equals(prev)) ecallback(ec)
		if (!ac.equals(ec)) acallback(ac)
		if (!bc.equals(ac)) bcallback(bc)
		if (bc.equals(prev)) return true
		prev = bc
	}
	return false
}

function pre(type, func) {
	return function(trans) {trans.pre[type.name] = func}
}

function post(type, func) {
	return function(trans) {trans.post[type.name] = func}
}

function identity() {return this}

function Transformer(funcs) {
	this.pre = {Lambda: identity, Variable: identity, Apply: identity}
	this.post = {Lambda: identity, Variable: identity, Apply: identity}
	for (var i = 0; i < funcs.length; i++) {
		funcs[i](this)
	}
	this.trail = {}
}
Transformer.prototype = {
	prune: function(oldEnt, newEnt) {return this.trail[oldEnt.id] = newEnt},
	getTransform: function(entity) {return this.trail[entity.id]},
	transform: function(entity) {return entity.doTransform(this)},
}
function lcode(name) {
	return eval('(function(){return runLCode(L.' + nameSub(name) + '(), arguments)})')
}
function runLCode(func, args) {
	for (var i = 0; i < args.length; i++) {
		func = func.call(null, wrap(args[i]))
	}
	return func
}
var entityCounter = 0
function Entity(obj) {
	for (i in obj) {
		this[i] = obj[i]
	}
}
Entity.prototype.__proto__ = {
	pretty: function() {return this.id == lcons.id ? pretty(constructEnv(this.ret([]).join(""))) : this.format()},
	transform: function() {return this.doTransform(new Transformer(arguments))},
	startTransform: function(transformer) {return transformer.getTransform(this) || this.doTransform(transformer)},
	doTransform: function(transformer) {
		if (transformer.getTransform(this)) return transformer.getTransform(this)
		var pre = transformer.pre[this.constructor.name].call(this, transformer)

		return pre && (transformer.getTransform(this) || transformer.prune(this, transformer.post[pre.constructor.name].call(pre.propagateTransform(transformer), transformer)))
	},
	alphaConvert: function() {return this},
	betaReduce: function() {return this},
	etaConvert: function() {return this.transform(post(Lambda, function(transformer) {
		return this.body instanceof Apply && this.body.arg == this.lvar && !this.body.func.containsVar(this.lvar) ? this.body.func : this
	}))},
	isApply: function() {return false},
	names: function() {
		var names = {}

		this.transform(pre(Lambda, function(){names[this.lvar.name] = 1; return this}))
		return names
	},
	uniquify: function(names) {return this.transform(pre(Lambda, function(transformer){transformer.prune(this.lvar, this.lvar.rename(names)); return this}))},
	hashKey: function() {return this.normalize().format(true, true)},
	globalSub: function() {
		var v = this.uniquify(exprs).transform(pre(Variable, function() {
			return exprs[this.name] ? exprs[this.name].expr.globalSub() : this
		}))
		var bad = false

		v.transform(pre(Lambda, function() {
			if (!(this.lvar instanceof Variable)) {
				bad = true; return this
			}
		}))
		if (bad) {
			alert("Error in globalSub for " + this.format(true, true))
		}
		return v
	},
	normalize: function() {
		var id = 0
		var fid = 0

		return this.globalSub().transform(
			pre(Lambda, function(transformer) {
				transformer.prune(this.lvar, new Variable(id++, this.lvar.free))
				return this
			}),
			pre(Variable, function(transformer) {return this.free ? new Variable("F" + fid++, true) : this})
		)
	},
	containsVar: function(targetVar) {
		var contains = false

		this.transform(pre(Variable, function() {contains = contains || this == targetVar; return this}))
		return contains
	},
}

function pfx(prefix) {return prefix == null ? '' : prefix}

function memoize(func) {
    var res
    var out = function() {
	return res || (res = func())
    }

    out.lambda = func.lambda
    return out
}

function setLambda(func, id) {
	func.lambda = lambdas[id]
	return func
}

function Lambda(arg, body, id) {
	this.lvar = arg
	this.body = body
	this.id = id || entityCounter++
	if (!lambdas[this.id]) lambdas[this.id] = this
}
Lambda.prototype.__proto__ = new Entity({
	equals: function(obj) {return obj instanceof Lambda && this.lvar.equals(obj.lvar) && this.body.equals(obj.body)},
	toString: function() {return this.format()},
	ret: function(stream, prefix) {
		var index = stream.length

		stream.push("setLambda(function(", pfx(prefix), this.lvar.cname, ") {\n", "return ")
		this.body.ret(stream, prefix)
		stream.push("\n}, " + this.id + ")")
		return stream
	},
	pass: function(stream, prefix) {
		stream.push("memoize(function(){return ")
		this.ret(stream, prefix)
		stream.push("\n})")
		return stream
	},
	apply: function(stream, prefix) {
		stream.push("(")
		this.ret(stream, prefix)
		stream.push(")")
		return stream
	},
	getHashedName: function() {var d = hashed[this.hashKey()]; return d && d.name},
	format: function(slash, nosubs, func, arg) {return (!nosubs && this.getHashedName()) || ((func ? '(' : '') + (slash ? '\\' : '&lambda;') + this.formatRest(slash, nosubs)) + (func ? ')' : '')},
	formatRest: function(slash, nosubs) {
		var n = !nosubs && this.body instanceof Lambda && this.body.getHashedName()

		return this.lvar.format(slash, nosubs) + (n ? (slash ? '  .  ' : '&nbsp;&nbsp;.&nbsp;&nbsp;') + n : this.body instanceof Lambda ? ' ' + this.body.formatRest(slash, nosubs) : (slash ? '  .  ' : '&nbsp;&nbsp;.&nbsp;&nbsp;') + this.body.format(slash, nosubs))
	},
	propagateTransform: function(transformer) {
		var newVar = this.lvar.startTransform(transformer)
		var newBod = this.body.startTransform(transformer)

		return this.make(newVar, newBod)
	},
	make: function(newVar, newBody) {return (this.lvar == newVar && this.body == newBody && this) || new Lambda(newVar, newBody, this.id)},
	substitute: function(value) {
		var trans = new Transformer([])

		trans.prune(this.lvar, value)
		return trans.transform(this.body)
	},
})
function numberFor(name, names) {
	var i = 0

	while (!names[name + '_' + ++i]) {}
	return i
}

var charCodes = {
	"'": '$a',
	',': '$b',
	'$': '$c',
	'@': '$d',
	'?': '$e',
	'/': '$f',
	'*': '$g',
	'&': '$h',
	'^': '$i',
	'#': '$j',
	'!': '$k',
	'`': '$l',
	'~': '$m',
	'-': '$n',
	'+': '$o',
	'=': '$p',
	'|': '$q',
	'[': '$r',
	']': '$s',
	'{': '$t',
	'}': '$u',
	'"': '$v',
	':': '$w',
	';': '$x',
	'<': '$y',
	'>': '$z',
	'%': '$A',
}
var codeChars = {}

for (i in charCodes) {
	codeChars[charCodes[i].substring(1)] = i
}

function nameSub(name) {
	var s = '_'

	for (var i = 0; i < name.length; i++) {
		var code = charCodes[name[i]]

		if (code) {
			if (!s) s = name.substring(0, i)
			s += code
		} else if (s) {
			s += name[i]
		}
	}
	return s || name
}
function nameUnsub(name) {
	var s = ''

	for (var i = 1; i < name.length; i++) {
		if (name[i] == '$') {
			if (!s) s = name.substring(0, i)
			s += codeChars[name[++i]]
		} else {
			if (s) s += name[i]
		}
	}
	return s
}

function Variable(txt, free, base, num) {
	this.name = txt
	this.base = base || txt
	this.cname = nameSub(txt)
	this.num = num || 0
	this.free = free
	this.id = entityCounter++
}
var vcount = 0
Variable.prototype.__proto__ = new Entity({
	equals: function(obj) {return obj instanceof Variable && this.name == obj.name},
	toString: function() {return "Variable(" + this.name + ")"},
	pass: function(stream, prefix) {
		stream.push(!this.free || exprs[this.name] || this.name == "$" || (this.name.match('^\\$[0-9]+$') && Number(this.name.substring(1)) < history.length) ? pfx(prefix) + this.cname
			: this.name.match('^[0-9]+(.[0-9]*)?$') ? "wrap(" + this.name + ")" : "wrap('" + this.name + "')")
		return stream
	},
	ret: function(stream, prefix) {
		if (!this.free || exprs[this.name] || this.name == "$" || (this.name.match('^\\$[0-9]+$') && Number(this.name.substring(1)) < history.length)) {
			this.pass(stream, prefix)
			stream.push("()")
		} else {
			stream.push(this.name.match('^[0-9]+(.[0-9]*)?$') ? this.name : "'" + this.name + "'")
		}
		return stream
	},
	apply: function(stream, prefix) {return this.ret(stream, prefix)},
	format: function() {return this.name},
	propagateTransform: function(transformer) {return this},
	rename: function(names) {
		if (!names[this.name]) return this
		var i = this.num

		while (names[this.base + '_' + ++i]) {}
		return new Variable(this.base + '_' + i, this.free, this.base, i)
	},
})

function Apply(func, arg) {
	this.func = func
	this.arg = arg
	this.id = entityCounter++
}
Apply.prototype.__proto__ = new Entity({
	equals: function(obj) {return obj instanceof Apply && this.func.equals(obj.func) && this.arg.equals(obj.arg)},
	apply: function(stream, prefix) {
		this.func.apply(stream, prefix)
		stream.push("(")
		this.arg.pass(stream, prefix)
		stream.push(")")
		return stream
	},
	ret: function(stream, prefix) {return this.apply(stream, prefix)},
	pass: function(stream, prefix) {
		stream.push("memoize(function(){return ")
		this.apply(stream, prefix)
		stream.push("\n})")
		return stream
	},
	toString: function() {return "Apply(" + this.func + " " + this.arg + ")"},
	format: function(slash, nosubs, func, arg) {return (arg ? '(' : '') + this.func.format(slash, nosubs, true, false) + ' ' + this.arg.format(slash, nosubs, func, true) + (arg ? ')' : '')},
	propagateTransform: function(transformer) {
		var newFunc = this.func.startTransform(transformer)
		var newArg = this.arg.startTransform(transformer)

		return this.make(newFunc, newArg)
	},
	make: function(newFunc, newArg) {return (newFunc == this.func && newArg == this.arg && this) || new Apply(newFunc, newArg)},
	innermost: function(func) {return this.func.isApply() ? new Apply(this.func.innermost(func), this.arg) : func.call(this)},
	isApply: function() {return true},
	alphaConvert: function() {return this.innermost(function() {return new Apply(this.func, this.arg.uniquify(this.func.names()))})},
	betaReduce: function() {return this.innermost(function() {return this.func.substitute(this.arg)})},
	etaConvert: function() {return this.innermost(function() {return new Apply(this.func.etaConvert(), this.arg)})},
})
function wrap(x) {return function() {return x}}
var Ltrue = lcode('true')
var Lfalse = lcode('false')
//var Land = lcode('and')
//var Lor = lcode('or')
//var Leq = lcode('eq')
//var Lxor = lcode('xor')
//var Lnot = lcode('not')
//var Lpair = lcode('pair')
var Lhead = lcode('head')
var Ltail = lcode('tail')
//var Lempty = lcode('empty')
//var Lappend = lcode('append')
//var Lisempty = lcode('isempty')
var LC = {
    loadDefs: loadDefs,
    runFunc: runFunc,
    evalLine: evalLine,
    reduce: reduce,
    order: order,
    historyExprs: [],
    pretty: pretty,
    output: function() {},
    resultCode: function() {},
    wrap: wrap,
    lcode: lcode,
}

return LC
})()