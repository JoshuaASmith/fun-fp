'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reduce = require('../reduce');

module.exports = function (fn, array) {
  return reduce(function (acc, value) {
    fn(value);
    return [].concat(_toConsumableArray(acc), [value]);
  }, [], array);
};