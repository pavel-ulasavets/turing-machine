'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _cuState = require('./cu-state');

var _cuState2 = _interopRequireDefault(_cuState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinishedState = (function (_State) {
    _inherits(FinishedState, _State);

    function FinishedState() {
        _classCallCheck(this, FinishedState);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FinishedState).apply(this, arguments));
    }

    _createClass(FinishedState, [{
        key: 'run',
        value: function run() {
            _logger2.default.log('The machine is in the final state! Do nothing!');
        }
    }, {
        key: 'step',
        value: function step() {
            _logger2.default.log('The machine is in the final state! Do nothing!');
        }
    }, {
        key: 'pause',
        value: function pause() {
            _logger2.default.log('The machine is in the final state! Do nothing!');
        }
    }]);

    return FinishedState;
})(_cuState2.default);

exports.default = FinishedState;