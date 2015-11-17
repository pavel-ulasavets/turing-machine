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

var PendingState = (function (_State) {
    _inherits(PendingState, _State);

    function PendingState() {
        _classCallCheck(this, PendingState);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PendingState).apply(this, arguments));
    }

    _createClass(PendingState, [{
        key: 'run',
        value: function run() {
            var _this2 = this;

            this.step().then(function (_ref) {
                var isEnd = _ref.isEnd;
                var isFailed = _ref.isFailed;

                if (!(isFailed || isEnd)) {
                    _logger2.default.log('PendingState.run(): Make one more step');
                    _this2.run();
                }
            });
        }
    }, {
        key: 'step',
        value: function step() {
            var _this3 = this;

            var machine = this._machine,
                cu = machine.getControlUnit();

            // move machine to the running state
            machine.setState(machine.getRunningState());

            // and perform a transition to the next state of the CU
            return cu.nextState().then(function (isEnd) {
                var state = undefined;

                if (isEnd) {
                    _logger2.default.log('PendingState.step(): The final state is achieved. Switching machine to the finished state...');
                    state = _this3._machine.getFinishedState();
                } else {
                    _logger2.default.log('PendingState.step(): The finale state isn\'t achieved. Switching machine to the pending state...');
                    state = _this3._machine.getPendingState();
                }

                _this3._machine.setState(state);
                return { isEnd: isEnd };
            }).catch(function (err) {
                _logger2.default.error('PendingState.step(): The machine work has been terminated with "' + err + '"');
                _this3._machine.setState(_this3._machine.getFailedState());

                // signalize that the machine has fallen into failed state
                return { isFailed: true };
            });
        }
    }, {
        key: 'pause',
        value: function pause() {
            _logger2.default.log('PendingState.pause(): The machine is already in "Pending state"! Do nothing!');
        }
    }]);

    return PendingState;
})(_cuState2.default);

exports.default = PendingState;