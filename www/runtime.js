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
  var Monad, Nil, SimpyCons, actors, amt, ast2Json, asyncMonad, basicCall, booleanFor, call, callMonad, cons, consFrom, continueMonads, curry, defaultEnv, define, ensureLeisureClass, functionInfo, getDataType, getMonadSyncMode, getType, getValue, hamt, head, identity, isMonad, lazy, left, lz, makeHamt, makeMonad, makeSyncMonad, monadModeSync, nameSub, newRunMonad, nextMonad, nextNode, none, parensContent, parensEnd, parensStart, posString, readDir, readFile, replaceErr, resolve, right, root, runMonad, rz, setDataType, setType, setValue, setWarnAsync, simpyCons, some, statFile, strCoord, strFromList, strToList, subcurry, tail, tokenPos, tokenString, trampCurry, values, warnAsync, withSyncModeDo, writeFile, _, _false, _identity, _ref, _ref1, _true,
    __slice = [].slice;

  _ref = root = module.exports = require('./base'), readFile = _ref.readFile, statFile = _ref.statFile, readDir = _ref.readDir, writeFile = _ref.writeFile, defaultEnv = _ref.defaultEnv, SimpyCons = _ref.SimpyCons, simpyCons = _ref.simpyCons, resolve = _ref.resolve, lazy = _ref.lazy;

  _ref1 = require('./ast'), define = _ref1.define, cons = _ref1.cons, Nil = _ref1.Nil, head = _ref1.head, tail = _ref1.tail, getType = _ref1.getType, getDataType = _ref1.getDataType, ast2Json = _ref1.ast2Json, ensureLeisureClass = _ref1.ensureLeisureClass, setType = _ref1.setType, setDataType = _ref1.setDataType, functionInfo = _ref1.functionInfo, nameSub = _ref1.nameSub;

  _ = require('./lodash.min');

  amt = require('persistent-hash-trie');

  rz = resolve;

  lz = lazy;

  call = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return basicCall(args, defaultEnv, identity);
  };

  callMonad = function() {
    var args, cont, env, _i;
    args = 3 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 2) : (_i = 0, []), env = arguments[_i++], cont = arguments[_i++];
    return basicCall(args, env, cont);
  };

  basicCall = function(args, env, cont) {
    var arg, res, _i, _len, _ref2;
    res = rz(global["L_" + args[0]]);
    _ref2 = args.slice(1);
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      arg = _ref2[_i];
      res = (function(arg) {
        return res(lz(arg));
      })(arg);
    }
    return runMonad(res, env, cont);
  };

  consFrom = function(array, i) {
    i = i || 0;
    if (i < array.length) {
      return cons(array[i], consFrom(array, i + 1));
    } else {
      return rz(L_nil);
    }
  };

  identity = function(x) {
    return x;
  };

  _identity = function(x) {
    return rz(x);
  };

  _true = setType((function(a) {
    return function(b) {
      return rz(a);
    };
  }), 'true');

  _false = setType((function(a) {
    return function(b) {
      return rz(b);
    };
  }), 'false');

  left = function(x) {
    return setType((function(lCase) {
      return function(rCase) {
        return rz(lCase)(lz(x));
      };
    }), 'left');
  };

  right = function(x) {
    return setType((function(lCase) {
      return function(rCase) {
        return rz(rCase)(lz(x));
      };
    }), 'right');
  };

  some = function(x) {
    return setType((function(someCase) {
      return function(noneCase) {
        return rz(someCase)(lz(x));
      };
    }), 'some');
  };

  none = setType((function(someCase) {
    return function(noneCase) {
      return rz(noneCase);
    };
  }), 'none');

  booleanFor = function(bool) {
    if (bool) {
      return rz(L_true);
    } else {
      return rz(L_false);
    }
  };

  define('eq', lz(function(a) {
    return function(b) {
      return booleanFor(rz(a) === rz(b));
    };
  }));

  define('==', lz(function(a) {
    return function(b) {
      return booleanFor(rz(a) === rz(b));
    };
  }));

  define('hasType', lz(function(data) {
    return function(func) {
      if (typeof rz(func) === 'string') {
        return booleanFor(getType(rz(data)) === rz(func));
      } else {
        return booleanFor(getType(rz(data)) === getDataType(rz(func)));
      }
    };
  }));

  define('getDataType', lz(function(func) {
    if (typeof rz(func) === 'string') {
      return rz(func);
    } else {
      return getDataType(rz(func));
    }
  }));

  define('assert', lz(function(bool) {
    return function(msg) {
      return function(expr) {
        return rz(bool)(expr)(function() {
          throw new Error(rz(msg));
        });
      };
    };
  }));

  define('assertLog', lz(function(bool) {
    return function(msg) {
      return function(expr) {
        return rz(bool)(expr)(function() {
          console.log(new Error(rz(msg)).stack);
          console.log("LOGGED ERROR -- RESUMING EXECUTION...");
          return rz(expr);
        });
      };
    };
  }));

  define('+', lz(function(x) {
    return function(y) {
      return rz(x) + rz(y);
    };
  }));

  define('-', lz(function(x) {
    return function(y) {
      return rz(x) - rz(y);
    };
  }));

  define('*', lz(function(x) {
    return function(y) {
      return rz(x) * rz(y);
    };
  }));

  define('/', lz(function(x) {
    return function(y) {
      return rz(x) / rz(y);
    };
  }));

  define('%', lz(function(x) {
    return function(y) {
      return rz(x) % rz(y);
    };
  }));

  define('<', lz(function(x) {
    return function(y) {
      return booleanFor(rz(x) < rz(y));
    };
  }));

  define('<=', lz(function(x) {
    return function(y) {
      return booleanFor(rz(x) <= rz(y));
    };
  }));

  define('>', lz(function(x) {
    return function(y) {
      return booleanFor(rz(x) > rz(y));
    };
  }));

  define('>=', lz(function(x) {
    return function(y) {
      return booleanFor(rz(x) >= rz(y));
    };
  }));

  define('floor', lz(function(x) {
    return Math.floor(rz(x));
  }));

  define('ceil', lz(function(x) {
    return Math.ceil(rz(x));
  }));

  define('min', lz(function(x) {
    return function(y) {
      return Math.min(rz(x), rz(y));
    };
  }));

  define('max', lz(function(x) {
    return function(y) {
      return Math.max(rz(x), rz(y));
    };
  }));

  define('round', lz(function(x) {
    return Math.round(rz(x));
  }));

  define('abs', lz(function(x) {
    return Math.abs(rz(x));
  }));

  define('sqrt', lz(function(x) {
    return Math.sqrt(rz(x));
  }));

  define('acos', lz(function(x) {
    return Math.acos(rz(x));
  }));

  define('asin', lz(function(x) {
    return Math.asin(rz(x));
  }));

  define('atan', lz(function(x) {
    return Math.atan(rz(x));
  }));

  define('atan2', lz(function(x) {
    return function(y) {
      return Math.atan2(rz(x), rz(y));
    };
  }));

  define('cos', lz(function(x) {
    return Math.cos(rz(x));
  }));

  define('sin', lz(function(x) {
    return Math.sin(rz(x));
  }));

  define('tan', lz(function(x) {
    return Math.tan(rz(x));
  }));

  define('rand', function() {
    return makeSyncMonad(function(env, cont) {
      return cont(Math.random());
    });
  });

  define('randInt', lz(function(low) {
    return function(high) {
      return makeSyncMonad(function(env, cont) {
        return cont(Math.floor(rz(low) + Math.random() * rz(high)));
      });
    };
  }));

  define('^', lz(function(x) {
    return function(y) {
      return Math.pow(rz(x), rz(y));
    };
  }));

  define('_show', lz(function(data) {
    var _ref2;
    if ((_ref2 = typeof rz(data)) === 'string' || _ref2 === 'number' || _ref2 === 'boolean') {
      return JSON.stringify(rz(data));
    } else if (getType(rz(data)) === 'err') {
      return rz(L_errMsg)(data);
    } else {
      return String(rz(data));
    }
  }));

  define('strString', lz(function(data) {
    return String(rz(data));
  }));

  define('_strAsc', lz(function(str) {
    return rz(str).charCodeAt(0);
  }));

  define('_strChr', lz(function(i) {
    return String.fromCharCode(rz(i));
  }));

  define('_strAt', lz(function(str) {
    return function(index) {
      return rz(str)[strCoord(rz(str), rz(index))];
    };
  }));

  define('_strStartsWith', lz(function(str) {
    return function(prefix) {
      return booleanFor(rz(str).substring(0, rz(prefix).length) === rz(prefix));
    };
  }));

  define('_strLen', lz(function(str) {
    return rz(str).length;
  }));

  define('_strToLowerCase', lz(function(str) {
    return rz(str).toLowerCase();
  }));

  define('_strToUpperCase', lz(function(str) {
    return rz(str).toUpperCase();
  }));

  define('_strReplace', lz(function(str) {
    return function(pat) {
      return function(repl) {
        return rz(str).replace(rz(pat), rz(repl));
      };
    };
  }));

  strCoord = function(str, coord) {
    if (coord < 0) {
      return str.length + coord;
    } else {
      return coord;
    }
  };

  define('_strSubstring', lz(function(str) {
    return function(start) {
      return function(end) {
        var a, b;
        a = strCoord(rz(str), rz(start));
        b = strCoord(rz(str), rz(end));
        if (b < a && rz(end) === 0) {
          b = rz(str).length;
        }
        return rz(str).substring(a, b);
      };
    };
  }));

  define('_strSplit', lz(function(str) {
    return function(pat) {
      return consFrom(rz(str).split(rz(pat) instanceof RegExp ? rz(pat) : new RegExp(rz(pat))));
    };
  }));

  define('_strCat', lz(function(list) {
    return _.map(rz(list).toArray(), function(el) {
      if (typeof el === 'string') {
        return el;
      } else {
        return rz(L_show)(lz(el));
      }
    }).join('');
  }));

  define('_strAdd', lz(function(s1) {
    return function(s2) {
      return rz(s1) + rz(s2);
    };
  }));

  define('_strMatch', lz(function(str) {
    return function(pat) {
      var groups, m, pos;
      m = rz(str).match((rz(pat) instanceof RegExp ? rz(pat) : new RegExp(rz(pat))));
      if (m) {
        groups = [];
        pos = 1;
        while (m[pos]) {
          groups.push(m[pos++]);
        }
        if (typeof m.index !== 'undefined') {
          return consFrom([m[0], consFrom(groups), m.index, m.input]);
        } else {
          return consFrom([m[0], consFrom(groups)]);
        }
      } else if (L_nil) {
        return rz(L_nil);
      } else {
        return Nil;
      }
    };
  }));

  define('_strToList', lz(function(str) {
    return strToList(rz(str));
  }));

  strToList = function(str) {
    if (str === '') {
      return Nil;
    } else {
      return cons(str[0], strToList(str.substring(1)));
    }
  };

  define('_strFromList', lz(function(list) {
    return strFromList(rz(list));
  }));

  strFromList = function(list) {
    if (list instanceof Leisure_nil) {
      return '';
    } else {
      return head(list) + strFromList(tail(list));
    }
  };

  define('_regexp', lz(function(str) {
    return new RegExp(rz(str));
  }));

  define('_regexpFlags', lz(function(str) {
    return function(flags) {
      return new RegExp(rz(str), rz(flags));
    };
  }));

  define('_jsonParse', lz(function(str) {
    return function(failCont) {
      return function(successCont) {
        var err, p;
        try {
          p = JSON.parse(rz(str));
          return rz(successCont)(lz(p));
        } catch (_error) {
          err = _error;
          return rz(failCont)(lz(err));
        }
      };
    };
  }));

  define('jsonStringify', lz(function(obj) {
    return function(failCont) {
      return function(successCont) {
        var err, s;
        try {
          s = JSON.stringify(rz(obj));
          return rz(successCont)(lz(s));
        } catch (_error) {
          err = _error;
          return rz(failCont)(lz(err));
        }
      };
    };
  }));

  define('getProperties', lz(function(func) {
    var _ref2;
    if ((_ref2 = rz(func)) != null ? _ref2.properties : void 0) {
      return rz(L_some)(lz(rz(func).properties));
    } else {
      return rz(L_none);
    }
  }));

  define('log', lz(function(str) {
    return function(res) {
      console.log(String(rz(str)));
      return rz(res);
    };
  }));

  define('logStack', lz(function(str) {
    return function(res) {
      console.log(new Error(rz(str)).stack);
      return rz(res);
    };
  }));

  define('breakpoint', lz(function(x) {
    return rz(x);
  }));

  makeMonad = function(guts) {
    var m;
    m = function() {};
    m.__proto__ = Monad.prototype;
    m.cmd = guts;
    m.type = 'monad';
    return m;
  };

  makeSyncMonad = function(guts) {
    var m;
    m = makeMonad(guts);
    m.sync = true;
    return m;
  };

  nextMonad = function(cont) {
    return cont;
  };

  replaceErr = function(err, msg) {
    err.message = msg;
    return err;
  };

  defaultEnv.write = function(str) {
    return process.stdout.write(str);
  };

  defaultEnv.err = function(err) {
    var _ref2;
    return this.write("ENV Error: " + ((_ref2 = err.stack) != null ? _ref2 : err));
  };

  defaultEnv.prompt = function() {
    throw new Error("Environment does not support prompting!");
  };

  monadModeSync = false;

  getMonadSyncMode = function() {
    return monadModeSync;
  };

  withSyncModeDo = function(newMode, block) {
    var err, oldMode, _ref2;
    oldMode = monadModeSync;
    monadModeSync = newMode;
    try {
      return block();
    } catch (_error) {
      err = _error;
      return console.log("ERR: " + ((_ref2 = err.stack) != null ? _ref2 : err));
    } finally {

    }
  };

  runMonad = function(monad, env, cont) {
    env = env != null ? env : root.defaultEnv;
    return withSyncModeDo(true, function() {
      return newRunMonad(monad, env, cont, []);
    });
  };

  isMonad = function(m) {
    return typeof m === 'function' && (m.cmd != null);
  };

  continueMonads = function(contStack, env) {
    return function(result) {
      return withSyncModeDo(false, function() {
        return newRunMonad(result, env, null, contStack);
      });
    };
  };

  asyncMonad = {
    toString: function() {
      return "<asyncMonadResult>";
    }
  };

  warnAsync = false;

  setWarnAsync = function(state) {
    return warnAsync = state;
  };

  newRunMonad = function(monad, env, cont, contStack) {
    var err, result, _ref2;
    if (cont) {
      contStack.push(cont);
    }
    try {
      while (true) {
        if (isMonad(monad)) {
          if (monad.binding) {
            (function(bnd) {
              return contStack.push(function(x) {
                return rz(bnd)(lz(x));
              });
            })(rz(monad.binding));
            monad = rz(monad.monad);
            continue;
          } else if (!monad.sync) {
            monadModeSync = false;
            if (warnAsync) {
              console.log("async monad");
            }
            monad.cmd(env, continueMonads(contStack, env));
            return asyncMonad;
          }
          result = monad.cmd(env, identity);
        } else {
          monadModeSync = true;
          result = monad;
        }
        if (!contStack.length) {
          return result;
        }
        monad = contStack.pop()(result);
      }
    } catch (_error) {
      err = _error;
      err = replaceErr(err, "\nERROR RUNNING MONAD, MONAD: " + monad + ", ENV: " + env + "...\n" + err.message);
      console.log((_ref2 = err.stack) != null ? _ref2 : err);
      if (env.errorHandlers.length) {
        return env.errorHandlers.pop()(err);
      }
    }
  };

  Monad = (function() {
    function Monad() {}

    Monad.prototype.toString = function() {
      return "Monad: " + (this.cmd.toString());
    };

    return Monad;

  })();

  global.L_runMonads = function(monadArray) {
    monadArray.reverse();
    newRunMonad(0, defaultEnv, null, monadArray);
    return monadArray;
  };

  define('define', lz(function(name) {
    return function(arity) {
      return function(src) {
        return function(def) {
          return makeSyncMonad(function(env, cont) {
            define(rz(name), def, rz(arity), rz(src));
            return cont((typeof L_true !== "undefined" && L_true !== null ? rz(L_true) : _true));
          });
        };
      };
    };
  }));

  define('bind', lz(function(m) {
    return function(binding) {
      var bindMonad;
      bindMonad = makeMonad(function(env, cont) {});
      bindMonad.monad = m;
      bindMonad.binding = binding;
      return bindMonad;
    };
  }));

  values = {};

  define('protect', lz(function(value) {
    return makeMonad(function(env, cont) {
      var hnd;
      hnd = function(err) {
        var _ref2, _ref3;
        console.log("PROTECTED ERROR: " + ((_ref2 = err.stack) != null ? _ref2 : err));
        return cont(left((_ref3 = err.stack) != null ? _ref3 : err));
      };
      env.errorHandlers.push(hnd);
      return runMonad(rz(value), env, (function(result) {
        if (env.errorHandlers.length) {
          if (env.errorHandlers[env.errorHandlers.length - 1] === hnd) {
            env.errorHandlers.pop();
          } else if (_.contains(env.errorHandlers, hnd)) {
            while (env.errorHandlers[env.errorHandlers.length - 1] !== hnd) {
              env.errorHandlers.pop();
            }
          }
        }
        return cont(right(result));
      }), []);
    });
  }));

  actors = {};

  define('actor', lz(function(name) {
    return function(func) {
      actors[name] = func;
      func.env = {
        values: {}
      };
      return func.env.__proto__ = defaultEnv;
    };
  }));

  define('send', lz(function(name) {
    return function(msg) {
      return setTimeout((function() {
        return runMonad(rz(actors[name])(msg), rz(actors[name]).env);
      }), 1);
    };
  }));

  define('hasValue', lz(function(name) {
    return makeSyncMonad(function(env, cont) {
      return cont(booleanFor(values[rz(name)] != null));
    });
  }));

  define('getValueOr', lz(function(name) {
    return function(defaultValue) {
      return makeSyncMonad(function(env, cont) {
        var _ref2;
        return cont((_ref2 = values[rz(name)]) != null ? _ref2 : rz(defaultValue));
      });
    };
  }));

  define('getValue', lz(function(name) {
    return makeSyncMonad(function(env, cont) {
      if (!(rz(name) in values)) {
        throw new Error("No value named '" + (rz(name)) + "'");
      }
      return cont(values[rz(name)]);
    });
  }));

  define('setValue', lz(function(name) {
    return function(value) {
      return makeSyncMonad(function(env, cont) {
        values[rz(name)] = rz(value);
        return cont(_true);
      });
    };
  }));

  define('deleteValue', lz(function(name) {
    return makeSyncMonad(function(env, cont) {
      delete values[rz(name)];
      return cont(_true);
    });
  }));

  setValue = function(key, value) {
    return values[key] = value;
  };

  getValue = function(key) {
    return values[key];
  };

  define('envHas', lz(function(name) {
    return makeSyncMonad(function(env, cont) {
      return cont(booleanFor(env.values[rz(name)] != null));
    });
  }));

  define('envGetOr', lz(function(name) {
    return function(defaultValue) {
      return makeSyncMonad(function(env, cont) {
        var _ref2;
        return cont((_ref2 = env.values[rz(name)]) != null ? _ref2 : rz(defaultValue));
      });
    };
  }));

  define('envGet', lz(function(name) {
    return makeSyncMonad(function(env, cont) {
      if (!(rz(name) in env.values)) {
        throw new Error("No value named '" + (rz(name)) + "'");
      }
      return cont(env.values[rz(name)]);
    });
  }));

  define('envSet', lz(function(name) {
    return function(value) {
      return makeSyncMonad(function(env, cont) {
        env.values[rz(name)] = rz(value);
        return cont(_true);
      });
    };
  }));

  define('envDelete', lz(function(name) {
    return makeSyncMonad(function(env, cont) {
      delete env.values[rz(name)];
      return cont(_true);
    });
  }));

  setValue('macros', Nil);

  define('defMacro', lz(function(name) {
    return function(def) {
      return makeSyncMonad(function(env, cont) {
        values.macros = cons(cons(rz(name), rz(def)), values.macros);
        return cont(_true);
      });
    };
  }));

  define('funcs', lz(makeSyncMonad(function(env, cont) {
    console.log("Leisure functions:\n" + (_(global.leisureFuncNames.toArray()).sort().join('\n')));
    return cont(_true);
  })));

  define('funcSrc', lz(function(func) {
    var info;
    if (typeof rz(func) === 'function') {
      info = functionInfo[rz(func).leisureName];
      if (info != null ? info.src : void 0) {
        return some(info.src);
      } else {
        return none;
      }
    }
  }));

  define('ast2Json', lz(function(ast) {
    return JSON.stringify(ast2Json(rz(ast)));
  }));

  define('override', lz(function(name) {
    return function(newFunc) {
      return makeSyncMonad(function(env, cont) {
        var n, oldDef;
        n = "L_" + (nameSub(rz(name)));
        oldDef = global[n];
        if (!oldDef) {
          throw new Error("No definition for " + (rz(name)));
        }
        global[n] = function() {
          return rz(newFunc)(oldDef);
        };
        return cont(_true);
      });
    };
  }));

  define('print', lz(function(msg) {
    return makeSyncMonad(function(env, cont) {
      var m;
      m = rz(msg);
      env.write("" + (env.presentValue(m)) + "\n");
      return cont(_true);
    });
  }));

  define('write', lz(function(msg) {
    return makeSyncMonad(function(env, cont) {
      env.write(env.presentValue(rz(msg)));
      return cont(_true);
    });
  }));

  define('readFile', lz(function(name) {
    return makeMonad(function(env, cont) {
      return readFile(rz(name), function(err, contents) {
        var _ref2;
        return cont((err ? left((_ref2 = err.stack) != null ? _ref2 : err) : right(contents)));
      });
    });
  }));

  define('readDir', lz(function(dir) {
    return makeMonad(function(env, cont) {
      return readDir(rz(dir), function(err, files) {
        var _ref2;
        return cont((err ? left((_ref2 = err.stack) != null ? _ref2 : err) : right(files)));
      });
    });
  }));

  define('writeFile', lz(function(name) {
    return function(data) {
      return makeMonad(function(env, cont) {
        return writeFile(rz(name), rz(data), function(err, contents) {
          var _ref2;
          return cont((err ? left((_ref2 = err.stack) != null ? _ref2 : err) : right(contents)));
        });
      });
    };
  }));

  define('statFile', lz(function(file) {
    return makeMonad(function(env, cont) {
      return statFile(rz(file), function(err, stats) {
        var _ref2;
        return cont((err ? left((_ref2 = err.stack) != null ? _ref2 : err) : right(stats)));
      });
    });
  }));

  define('prompt', lz(function(msg) {
    return makeMonad(function(env, cont) {
      return env.prompt(String(rz(msg)), function(input) {
        return cont(input);
      });
    });
  }));

  define('rand', lz(makeSyncMonad(function(env, cont) {
    return cont(Math.random());
  })));

  define('js', lz(function(str) {
    return makeSyncMonad(function(env, cont) {
      var err, result;
      try {
        result = eval(rz(str));
        return cont(right(result));
      } catch (_error) {
        err = _error;
        return cont(left(err));
      }
    });
  }));

  define('delay', lz(function(timeout) {
    return makeMonad(function(env, cont) {
      return setTimeout((function() {
        return cont(_true);
      }), rz(timeout));
    });
  }));

  define('altDef', lz(function(name) {
    return function(alt) {
      return function(arity) {
        return function(def) {
          return makeMonad(function(env, cont) {
            var alts, i, info, newDef, nm;
            info = functionInfo[rz(name)];
            if (!info) {
              info = functionInfo[rz(name)] = {
                src: '',
                arity: -1,
                alts: {},
                altList: []
              };
            }
            if (!info.alts[rz(alt)]) {
              info.altList.push(rz(alt));
            }
            info.alts[rz(alt)] = rz(def);
            alts = (function() {
              var _i, _len, _ref2, _results;
              _ref2 = info.altList;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                i = _ref2[_i];
                _results.push(info.alts[i]);
              }
              return _results;
            })();
            newDef = curry(rz(arity), function(args) {
              var arg, opt, res, _i, _j, _k, _len, _len1, _len2;
              for (_i = 0, _len = alts.length; _i < _len; _i++) {
                alt = alts[_i];
                opt = alt;
                for (_j = 0, _len1 = args.length; _j < _len1; _j++) {
                  arg = args[_j];
                  opt = opt(arg);
                }
                if (getType(opt) === 'some') {
                  return opt(lz(function(x) {
                    return rz(x);
                  }))(lz(_false));
                }
              }
              if (info.mainDef) {
                res = rz(info.mainDef);
                for (_k = 0, _len2 = args.length; _k < _len2; _k++) {
                  arg = args[_k];
                  res = res(arg);
                }
                return res;
              }
              throw new Error("No default definition for " + (rz(name)));
            });
            nm = "L_" + (nameSub(rz(name)));
            global[nm] = global.leisureFuncNames[nm] = newDef;
            return cont(def);
          });
        };
      };
    };
  }));

  curry = function(arity, func) {
    return function() {
      return lz(function(arg) {
        return lz((subcurry(arity, func, null))(arg));
      });
    };
  };

  subcurry = function(arity, func, args) {
    return lz(function(arg) {
      args = simpyCons(arg, args);
      if (arity === 1) {
        return func(args.toArray().reverse());
      } else {
        return subcurry(arity - 1, func, args);
      }
    });
  };

  makeHamt = function(hamt) {
    var t;
    t = setDataType((function() {}), 'hamt');
    t.hamt = hamt;
    t.type = 'hamt';
    return t;
  };

  hamt = makeHamt(amt.Trie());

  define('hamt', lz(hamt));

  define('hamtWith', lz(function(key) {
    return function(value) {
      return function(hamt) {
        return makeHamt(amt.assoc(rz(hamt).hamt, rz(key), rz(value)));
      };
    };
  }));

  define('hamtFetch', lz(function(key) {
    return function(hamt) {
      return amt.get(rz(hamt).hamt, rz(key));
    };
  }));

  define('hamtGet', lz(function(key) {
    return function(hamt) {
      var v;
      v = amt.get(rz(hamt).hamt, rz(key));
      if (v !== void 0) {
        return some(v);
      } else {
        return none;
      }
    };
  }));

  define('hamtWithout', lz(function(key) {
    return function(hamt) {
      return makeHamt(amt.dissoc(rz(hamt).hamt, rz(key)));
    };
  }));

  define('hamtPairs', lz(function(hamt) {
    return nextNode(simpyCons(rz(hamt).hamt, null));
  }));

  nextNode = function(stack) {
    var child, k, key, node, value, _ref2, _ref3;
    if (stack === null) {
      return rz(L_nil);
    }
    node = stack.head;
    stack = stack.tail;
    switch (node.type) {
      case 'trie':
        _ref2 = node.children;
        for (k in _ref2) {
          child = _ref2[k];
          stack = simpyCons(child, stack);
        }
        return nextNode(stack);
      case 'value':
        return rz(L_acons)(lz(node.key))(lz(node.value))(function() {
          return nextNode(stack);
        });
      case 'hashmap':
        _ref3 = node.values;
        for (key in _ref3) {
          value = _ref3[key];
          stack = simpyCons(value, stack);
        }
        return nextNode(stack);
      default:
        return console.log("UNKNOWN HAMT NODE TYPE: " + node.type);
    }
  };

  define('trampolineCall', lz(function(func) {
    var ret;
    ret = rz(func);
    while (true) {
      if (typeof ret === 'function' && ret.trampoline) {
        ret = ret();
      } else {
        return ret;
      }
    }
  }));

  define('trampoline', lz(function(func) {
    var arity, f;
    f = rz(func);
    arity = functionInfo[f.leisureName].arity;
    return trampCurry(f, arity);
  }));

  trampCurry = function(func, arity) {
    return function(arg) {
      var a, result;
      a = rz(arg);
      if (arity > 1) {
        return trampCurry(func(function() {
          return a;
        }), arity - 1);
      } else {
        result = function() {
          return func(function() {
            return a;
          });
        };
        result.trampoline = true;
        return result;
      }
    };
  };

  ensureLeisureClass('token');

  Leisure_token.prototype.toString = function() {
    return "Token(" + (JSON.stringify(tokenString(this))) + ", " + (posString(tokenPos(this))) + ")";
  };

  tokenString = function(t) {
    return t(lz(function(txt) {
      return function(pos) {
        return rz(txt);
      };
    }));
  };

  tokenPos = function(t) {
    return t(lz(function(txt) {
      return function(pos) {
        return rz(pos);
      };
    }));
  };

  ensureLeisureClass('filepos');

  posString = function(p) {
    if (p instanceof Leisure_filepos) {
      return p(lz(function(file) {
        return function(line) {
          return function(offset) {
            return "" + (rz(file)) + ":" + (rz(line)) + "." + (rz(offset));
          };
        };
      }));
    } else {
      return p;
    }
  };

  ensureLeisureClass('parens');

  Leisure_parens.prototype.toString = function() {
    return "Parens(" + (posString(parensStart(this))) + ", " + (posString(parensEnd(this))) + ", " + (parensContent(this)) + ")";
  };

  parensStart = function(p) {
    return p(lz(function(s) {
      return function(e) {
        return function(l) {
          return rz(s);
        };
      };
    }));
  };

  parensEnd = function(p) {
    return p(lz(function(s) {
      return function(e) {
        return function(l) {
          return rz(e);
        };
      };
    }));
  };

  parensContent = function(p) {
    return p(lz(function(s) {
      return function(e) {
        return function(l) {
          return rz(l);
        };
      };
    }));
  };

  ensureLeisureClass('true');

  Leisure_true.prototype.toString = function() {
    return "true";
  };

  ensureLeisureClass('false');

  Leisure_false.prototype.toString = function() {
    return "false";
  };

  ensureLeisureClass('left');

  Leisure_left.prototype.toString = function() {
    return "Left(" + (this(lz(_identity))(lz(_identity))) + ")";
  };

  ensureLeisureClass('right');

  Leisure_right.prototype.toString = function() {
    return "Right(" + (this(lz(_identity))(lz(_identity))) + ")";
  };

  root._true = _true;

  root._false = _false;

  root.stateValues = values;

  root.runMonad = runMonad;

  root.newRunMonad = newRunMonad;

  root.isMonad = isMonad;

  root.identity = identity;

  root.setValue = setValue;

  root.getValue = getValue;

  root.makeMonad = makeMonad;

  root.makeSyncMonad = makeSyncMonad;

  root.replaceErr = replaceErr;

  root.left = left;

  root.right = right;

  root.getMonadSyncMode = getMonadSyncMode;

  root.asyncMonad = asyncMonad;

  root.setWarnAsync = setWarnAsync;

  root.call = call;

  root.callMonad = callMonad;

  root.basicCall = basicCall;

  root.booleanFor = booleanFor;

  root.newConsFrom = consFrom;

  if (typeof window !== "undefined" && window !== null) {
    window.runMonad = runMonad;
    window.setType = setType;
    window.setDataType = setDataType;
    window.defaultEnv = defaultEnv;
    window.identity = identity;
  }

}).call(this);

/*
//@ sourceMappingURL=runtime.map
*/
