(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function (iterator) {
  return function (fn, list) {
    var idx = 0;
    var origFn = fn;
    fn = function fn() {
      var result = origFn.apply(null, [arguments[0], idx]);
      idx += 1;
      return result;
    };
    return iterator.apply(null, [fn, list]);
  };
};
},{}],2:[function(require,module,exports){
"use strict";

module.exports = function (x) {
  return function () {
    return x;
  };
};
},{}],3:[function(require,module,exports){
'use strict';

var reverse = require('../../list/reverse');
var reduce = require('../../list/reduce');

module.exports = function () {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (value) {
    return reduce(function (acc, fn) {
      return fn(acc);
    }, value, reverse(fns));
  };
};
},{"../../list/reduce":17,"../../list/reverse":19}],4:[function(require,module,exports){
'use strict';

var concat = require('../../list/concat');
var add = require('../../math/add');

// module.exports = (fn) => {
//   let n = fn.length
//   let store = []
//
//   const ifn = (...args) => {
//     if (add(args.length, store.length) < n) {
//       store = concat(store, args)
//       return ifn
//     }
//     const result = fn.apply(null, concat(store, args))
//     store = []
//     return result
//   }
//
//   return ifn
// }
var _arity = function _arity(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.apply(null, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(null, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(null, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(null, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(null, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(null, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(null, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(null, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(null, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(null, arguments);
      };
    default:
      throw new Error('First argument to _arity function must be a non-negative integer no greater than ten');
  }
};
var _curry = function _curry(length, received, fn) {
  if (length === received.length) {
    return fn.apply(null, received);
  }
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var combined = received.concat(args);
    var left = length - combined.length;
    return left <= 0 ? fn.apply(null, combined) : _arity(left, _curry(length, combined, fn));
  };
};

module.exports = function (fn) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _curry(fn.length, args, fn);
  };
};
},{"../../list/concat":9,"../../math/add":28}],5:[function(require,module,exports){
"use strict";

module.exports = function (v) {
  return v;
};
},{}],6:[function(require,module,exports){
'use strict';

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var reverse = require('../../list/reverse');

module.exports = function (method) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _reverse = reverse(args),
        _reverse2 = _toArray(_reverse),
        data = _reverse2[0],
        rest = _reverse2.slice(1);

    return data[method].apply(data, reverse(rest));
  };
};
},{"../../list/reverse":19}],7:[function(require,module,exports){
'use strict';

module.exports = {
  addIndex: require('./function/addindex'),
  compose: require('./function/compose'),
  curry: require('./function/curry'),
  identity: require('./function/identity'),
  always: require('./function/always'),
  invoker: require('./function/invoker'),

  byIndex: require('./list/by-index'),
  concat: require('./list/concat'),
  filter: require('./list/filter'),
  find: require('./list/find'),
  flatten: require('./list/flatten'),
  head: require('./list/head'),
  init: require('./list/init'),
  map: require('./list/map'),
  pluck: require('./list/pluck'),
  reduce: require('./list/reduce'),
  reject: require('./list/reject'),
  reverse: require('./list/reverse'),
  tail: require('./list/tail'),
  tap: require('./list/tap'),
  times: require('./list/times'),
  update: require('./list/update'),

  and: require('./logic/and'),
  or: require('./logic/or'),
  not: require('./logic/not'),
  ifElse: require('./logic/ifElse'),

  add: require('./math/add'),
  subtract: require('./math/subtract'),
  sum: require('./math/sum'),

  assoc: require('./object/assoc'),
  assocPath: require('./object/assoc-path'),
  has: require('./object/has'),
  keys: require('./object/keys'),
  lens: require('./object/lens'),
  lensPath: require('./object/lens-path'),
  lensProp: require('./object/lens-prop'),
  over: require('./object/over'),
  path: require('./object/path'),
  pathOr: require('./object/path-or'),
  prop: require('./object/prop'),
  propOr: require('./object/prop-or'),
  set: require('./object/set'),
  view: require('./object/view'),

  equals: require('./relation/equals'),
  gt: require('./relation/gt'),
  lt: require('./relation/lt'),

  split: require('./string/split'),

  is: require('./type/is'),
  isArray: require('./type/is-array'),
  isNil: require('./type/is-nil')
};
},{"./function/addindex":1,"./function/always":2,"./function/compose":3,"./function/curry":4,"./function/identity":5,"./function/invoker":6,"./list/by-index":8,"./list/concat":9,"./list/filter":10,"./list/find":11,"./list/flatten":12,"./list/head":13,"./list/init":14,"./list/map":15,"./list/pluck":16,"./list/reduce":17,"./list/reject":18,"./list/reverse":19,"./list/tail":20,"./list/tap":21,"./list/times":22,"./list/update":23,"./logic/and":24,"./logic/ifElse":25,"./logic/not":26,"./logic/or":27,"./math/add":28,"./math/subtract":29,"./math/sum":30,"./object/assoc":32,"./object/assoc-path":31,"./object/has":33,"./object/keys":34,"./object/lens":37,"./object/lens-path":35,"./object/lens-prop":36,"./object/over":38,"./object/path":40,"./object/path-or":39,"./object/prop":42,"./object/prop-or":41,"./object/set":43,"./object/view":44,"./relation/equals":45,"./relation/gt":46,"./relation/lt":47,"./string/split":48,"./type/is":51,"./type/is-array":49,"./type/is-nil":50}],8:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = curry(function (index, list) {
  return list[index];
});
},{"../../function/curry":4}],9:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reduce = require('../reduce');

module.exports = function () {
  for (var _len = arguments.length, lists = Array(_len), _key = 0; _key < _len; _key++) {
    lists[_key] = arguments[_key];
  }

  return reduce(function (acc, value) {
    acc.push.apply(acc, _toConsumableArray(value));
    return acc;
  }, [], lists);
};
},{"../reduce":17}],10:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reduce = require('../reduce');

module.exports = function (fn, array) {
  return reduce(function (acc, value) {
    return fn(value) ? [].concat(_toConsumableArray(acc), [value]) : acc;
  }, [], array);
};
},{"../reduce":17}],11:[function(require,module,exports){
'use strict';

var filter = require('../filter');
var head = require('../head');
var compose = require('../../function/compose');

module.exports = function (fn, list) {
  return head(filter(fn, list));
};

//module.exports = compose(head,filter)
},{"../../function/compose":3,"../filter":10,"../head":13}],12:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reduce = require('../reduce');
module.exports = function (list) {
  return reduce(function (acc, value) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(value));
  }, [], list);
};
},{"../reduce":17}],13:[function(require,module,exports){
"use strict";

module.exports = function (list) {
  return list.length > 0 ? list[0] : null;
};
},{}],14:[function(require,module,exports){
'use strict';

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var tail = require('../tail');
var reverse = require('../reverse');
var compose = require('../../function/compose');

module.exports = function (list) {
  var _reverse = reverse(list),
      _reverse2 = _toArray(_reverse),
      rest = _reverse2.slice(1);

  return reverse(rest);
};
},{"../../function/compose":3,"../reverse":19,"../tail":20}],15:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reduce = require('../reduce');

module.exports = function (fn, array) {
  return reduce(function (acc, value) {
    return [].concat(_toConsumableArray(acc), [fn(value)]);
  }, [], array);
};
},{"../reduce":17}],16:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
var map = require('../map');
var prop = require('../../object/prop');

module.exports = curry(function (string, list) {
  return map(prop(string), list);
});
},{"../../function/curry":4,"../../object/prop":42,"../map":15}],17:[function(require,module,exports){
"use strict";

module.exports = function (fn, acc, list) {
  for (var index = 0; index < list.length; index++) {
    acc = fn(acc, list[index]);
  }
  return acc;
};
},{}],18:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reduce = require('../reduce');

module.exports = function (fn, list) {
  return reduce(function (acc, value) {
    return !fn(value) ? [].concat(_toConsumableArray(acc), [value]) : acc;
  }, [], list);
};
},{"../reduce":17}],19:[function(require,module,exports){
'use strict';

var reduce = require('../reduce');
var concat = require('../concat');

module.exports = function (list) {
  return reduce(function (acc, value) {
    return concat([value], acc);
  }, [], list);
};
},{"../concat":9,"../reduce":17}],20:[function(require,module,exports){
'use strict';

var addindex = require('../../function/addindex');
var filter = require('../filter');
var curry = require('../../function/curry');

module.exports = function (list) {
  return addindex(filter)(function (v, i) {
    return i !== 0;
  }, list);
};
},{"../../function/addindex":1,"../../function/curry":4,"../filter":10}],21:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reduce = require('../reduce');

module.exports = function (fn, array) {
  return reduce(function (acc, value) {
    fn(value);
    return [].concat(_toConsumableArray(acc), [value]);
  }, [], array);
};
},{"../reduce":17}],22:[function(require,module,exports){
"use strict";

module.exports = function (fn, count) {
  var list = [];
  for (var i = 0; i < count; i++) {
    list[i] = fn(i);
  }
  return list;
};
},{}],23:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
var addIndex = require('../../function/addindex');
var map = require('../map');

module.exports = curry(function (n, a, list) {
  var mapIndex = addIndex(map);
  return mapIndex(function (v, i) {
    return i === n ? a : v;
  }, list);
});
},{"../../function/addindex":1,"../../function/curry":4,"../map":15}],24:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = curry(function (a, b) {
  return a && b;
});
},{"../../function/curry":4}],25:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');

module.exports = curry(function (predicate, onTrue, onFalse) {
  return function (x) {
    return predicate(x) ? onTrue(x) : onFalse(x);
  };
});
},{"../../function/curry":4}],26:[function(require,module,exports){
"use strict";

module.exports = function (a) {
  return !a;
};
},{}],27:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = curry(function (a, b) {
  return a || b;
});
},{"../../function/curry":4}],28:[function(require,module,exports){
"use strict";

module.exports = function (a, b) {
  return a + b;
};
},{}],29:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = curry(function (a, b) {
  return a - b;
});
},{"../../function/curry":4}],30:[function(require,module,exports){
'use strict';

var reduce = require('../../list/reduce');
module.exports = function (list) {
  return reduce(function (acc, v) {
    return acc + v;
  }, 0, list);
};
},{"../../list/reduce":17}],31:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
var head = require('../../list/head');
var tail = require('../../list/tail');
var propOr = require('../prop-or');
var assoc = require('../assoc');

var assocPath = module.exports = curry(function (path, value, obj) {
  if (path.length === 0) {
    return value;
  }
  var idx = head(path);

  if (path.length > 1) {
    var nextObj = propOr({}, idx, obj);
    value = assocPath(tail(path), value, nextObj);
  }
  return assoc(idx, value, obj);
});
},{"../../function/curry":4,"../../list/head":13,"../../list/tail":20,"../assoc":32,"../prop-or":41}],32:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');

module.exports = curry(function (prop, value, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = value;
  return result;
});
},{"../../function/curry":4}],33:[function(require,module,exports){
"use strict";

module.exports = function (name, obj) {
  return obj.hasOwnProperty(name) ? true : false;
};
},{}],34:[function(require,module,exports){
'use strict';

var is = require('../../type/is');

module.exports = function (obj) {
  return is(Object, obj) ? Object.keys(obj) : [];
};
},{"../../type/is":51}],35:[function(require,module,exports){
'use strict';

var path = require('../path');
var assocPath = require('../assoc-path');
var lens = require('../lens');

module.exports = function (k) {
  return lens(path(k), assocPath(k));
};
},{"../assoc-path":31,"../lens":37,"../path":40}],36:[function(require,module,exports){
'use strict';

var prop = require('../prop');
var assoc = require('../assoc');
var lens = require('../lens');

module.exports = function (k) {
  return lens(prop(k), assoc(k));
};
},{"../assoc":32,"../lens":37,"../prop":42}],37:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');

module.exports = curry(function (getter, setter) {
  return function (functorFn) {
    return function (target) {
      return functorFn(getter(target)).map(function (focus) {
        return setter(focus, target);
      });
    };
  };
});
},{"../../function/curry":4}],38:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = function () {
  var Identity = function Identity(x) {
    return { value: x, map: function map(fn) {
        return Identity(fn(x));
      } };
  };

  return curry(function (lens, fn, obj) {
    return lens(function (y) {
      return Identity(fn(y));
    })(obj).value;
  });
}();
},{"../../function/curry":4}],39:[function(require,module,exports){
'use strict';

var path = require('../path');
var isNil = require('../../type/is-nil');
var compose = require('../../function/compose');
var always = require('../../function/always');
var identity = require('../../function/identity');
var tap = require('../../list/tap');
var ifElse = require('../../logic/ifElse');

module.exports = function (defaultValue, pathList, obj) {
    return compose(ifElse(isNil, always(defaultValue), identity), path(pathList))(obj);
};
},{"../../function/always":2,"../../function/compose":3,"../../function/identity":5,"../../list/tap":21,"../../logic/ifElse":25,"../../type/is-nil":50,"../path":40}],40:[function(require,module,exports){
'use strict';

var reduce = require('../../list/reduce');
var prop = require('../prop');
var is = require('../../type/is');
var curry = require('../../function/curry');

module.exports = curry(function (list, obj) {
  return reduce(function (acc, value) {
    return is(Object, acc) ? prop(value, acc) : acc;
  }, obj, list);
});
},{"../../function/curry":4,"../../list/reduce":17,"../../type/is":51,"../prop":42}],41:[function(require,module,exports){
'use strict';

var prop = require('../prop');
var curry = require('../../function/curry');

module.exports = curry(function (defaultValue, key, obj) {
  return prop(key, obj) || defaultValue;
});
},{"../../function/curry":4,"../prop":42}],42:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = curry(function (name, obj) {
  return obj[name];
});
},{"../../function/curry":4}],43:[function(require,module,exports){
'use strict';

var over = require('../over');
var curry = require('../../function/curry');

module.exports = curry(function (lens, v, x) {
  return over(lens, function (_) {
    return v;
  }, x);
});
},{"../../function/curry":4,"../over":38}],44:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');

module.exports = function (_) {
  var Const = function Const(x) {
    return {
      value: x,
      map: function map() {
        return this;
      }
    };
  };

  return curry(function (lens, x) {
    return lens(Const)(x).value;
  });
}();
},{"../../function/curry":4}],45:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = curry(function (a, b) {
  return a === b;
});
},{"../../function/curry":4}],46:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = curry(function (a, b) {
  return a > b;
});
},{"../../function/curry":4}],47:[function(require,module,exports){
'use strict';

var curry = require('../../function/curry');
module.exports = curry(function (a, b) {
  return a < b;
});
},{"../../function/curry":4}],48:[function(require,module,exports){
'use strict';

var invoker = require('../../function/invoker');

module.exports = invoker('split');
},{"../../function/invoker":6}],49:[function(require,module,exports){
'use strict';

var is = require('../is');

module.exports = function (list) {
  return is(Object, list) && list.length > -1;
};
},{"../is":51}],50:[function(require,module,exports){
"use strict";

module.exports = function (value) {
  return value == null;
};
},{}],51:[function(require,module,exports){
"use strict";

module.exports = function (Ctor, value) {
  return value != null && value.constructor === Ctor || value instanceof Ctor;
};
},{}]},{},[7]);
