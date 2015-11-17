'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 @class Writer - define a standard interface of writing
 */

var Writer = (function () {
  function Writer() {
    _classCallCheck(this, Writer);
  }

  _createClass(Writer, [{
    key: 'write',

    /**
     * @method write - write a string at several position of output
     */
    value: function write() {
      var position = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var str = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      throw new Error('Not implemented error!');
    }
  }]);

  return Writer;
})();

exports.default = Writer;