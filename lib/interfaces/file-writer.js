'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _writer = require('./writer');

var _writer2 = _interopRequireDefault(_writer);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // modules

// promisified versions of fs API
var readFile = (0, _es6Promisify2.default)(_fs2.default.readFile);
var writeFile = (0, _es6Promisify2.default)(_fs2.default.writeFile);

/**
 @class Writer - define a standard interface of writing
 */

var FileWriter = (function (_Writer) {
    _inherits(FileWriter, _Writer);

    function FileWriter(path) {
        _classCallCheck(this, FileWriter);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileWriter).call(this));

        _this._path = path;
        return _this;
    }
    /**
     * @method write - write a string at several position of output
     */

    _createClass(FileWriter, [{
        key: 'write',
        value: function write() {
            var _this2 = this;

            var position = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var str = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            return readFile(this._path, 'utf8').then(function (content) {
                var symbols = Array.from(content);
                symbols.splice(position, 1, str);
                return symbols.join('');
            }).then(function (toBeWritten) {
                return writeFile(_this2._path, toBeWritten).then(function () {
                    _logger2.default.info('FileWriter.write(): ' + toBeWritten + ' has been successfully written!');
                });
            });
        }
    }]);

    return FileWriter;
})(_writer2.default);

exports.default = FileWriter;