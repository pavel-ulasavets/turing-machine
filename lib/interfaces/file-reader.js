'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // libraries

// other entities

var open = (0, _es6Promisify2.default)(_fs2.default.open);
var read = (0, _es6Promisify2.default)(_fs2.default.read);
var readFile = (0, _es6Promisify2.default)(_fs2.default.readFile);

var FileReader = (function (_Reader) {
    _inherits(FileReader, _Reader);

    /**
     * @param {String} path - a path to the file to read from
     */

    function FileReader(path) {
        _classCallCheck(this, FileReader);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileReader).call(this));

        _this._path = path;
        return _this;
    }

    /**
     * @method read
     * @param {Number} position - position where reading should be started
     * @param {Number} number - a number of symbols to be read
     */

    _createClass(FileReader, [{
        key: 'read',
        value: function read() {
            var position = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var number = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            _logger2.default.info('FileReader.read(): Reading of ' + number + ' symbol(-s) from ' + this._path + ' at position ' + position + ' ...');
            return readFile(this._path, 'utf8').then(function (content) {
                if (content.length > position + number) {
                    return content.slice(position, position + number);
                } else {
                    // at this case we consider that the end of the file has been achieved
                    // it's the marker of the end of line
                    return '\n';
                }
            });
        }
    }]);

    return FileReader;
})(_reader2.default);

exports.default = FileReader;