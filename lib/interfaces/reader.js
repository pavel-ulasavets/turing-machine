'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Reader - define a standart interface for reading
 */

var Reader = (function () {
  function Reader() {
    _classCallCheck(this, Reader);
  }

  _createClass(Reader, [{
    key: 'read',

    /**
     * @method read
     * @param {Number} position - position where reading should be started
     * @param {Number} number - a number of symbols to be read
     */
    value: function read() {
      var position = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var number = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      throw new Error('Not implemented error!');
    }
  }]);

  return Reader;
})();

exports.default = Reader;