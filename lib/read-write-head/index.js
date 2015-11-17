'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); // libraries

// interfaces to be used

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _writer = require('../interfaces/writer');

var _writer2 = _interopRequireDefault(_writer);

var _reader = require('../interfaces/reader');

var _reader2 = _interopRequireDefault(_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ReadWriteHead - a part of the Turing machine
 */

var ReadWriteHead = (function () {
    /**
     * @param {Reader} reader - a Reader interface implementation
     * @param {Writer} writer - a Writer interface implementation
     */

    function ReadWriteHead(reader, writer) {
        _classCallCheck(this, ReadWriteHead);

        if (!(reader instanceof _reader2.default && writer instanceof _writer2.default)) {
            throw new Error('Incorrect params!');
        }

        this._reader = reader;
        this._writer = writer;
        this._position = 0;
    }

    /**
     * @method read
     * @param {Number} number -  a number of symbols to be read
     * @return {Promise} - a promise that will be resolved with read string
     */

    _createClass(ReadWriteHead, [{
        key: 'read',
        value: function read() {
            var number = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            return _promise2.default.resolve(this._reader.read(this._position, number));
        }

        /**
         * @method write
         * @param {String} str - a string to be written
         * @return {Promise} - a promise that will be resolve in cas of success or rejected otherwise
         */

    }, {
        key: 'write',
        value: function write() {
            var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            return _promise2.default.resolve(str && str.length ? this._writer.write(this._position, str) : '');
        }

        /**
         * @method left - shift a carriage on number positions to the left
         * if specified number > this._position the carriage is shifted to zero 
         *
         * @param a number of position to be shifted on
         * @return {Boolean} - true if the carriage is shifted successully, false otherwise
         */

    }, {
        key: 'left',
        value: function left() {
            var number = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            if (this._position > 0) {
                this._position = Math.max(this._position - number, 0);
            }
        }

        /**
         * @method right - shift a carriage on number positions to the right
         */

    }, {
        key: 'right',
        value: function right() {
            var number = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            this._position += number;
        }
    }]);

    return ReadWriteHead;
})();

exports.default = ReadWriteHead;