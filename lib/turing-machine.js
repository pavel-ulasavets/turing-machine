'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _controlUnit = require('./control-unit');

var _controlUnit2 = _interopRequireDefault(_controlUnit);

var _readWriteHead = require('./read-write-head');

var _readWriteHead2 = _interopRequireDefault(_readWriteHead);

var _fileReader = require('./interfaces/file-reader');

var _fileReader2 = _interopRequireDefault(_fileReader);

var _fileWriter = require('./interfaces/file-writer');

var _fileWriter2 = _interopRequireDefault(_fileWriter);

var _cuPendingState = require('./states/cu-pending-state');

var _cuPendingState2 = _interopRequireDefault(_cuPendingState);

var _cuRunningState = require('./states/cu-running-state');

var _cuRunningState2 = _interopRequireDefault(_cuRunningState);

var _cuFinishedState = require('./states/cu-finished-state');

var _cuFinishedState2 = _interopRequireDefault(_cuFinishedState);

var _cuFailedState = require('./states/cu-failed-state');

var _cuFailedState2 = _interopRequireDefault(_cuFailedState);

var _cuState = require('./states/cu-state');

var _cuState2 = _interopRequireDefault(_cuState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// variables
var states = new WeakMap();

/**
 * @class  TuringMachine
 */

var TuringMachine = (function () {
    function TuringMachine(configuration, pathToTape) {
        _classCallCheck(this, TuringMachine);

        states.set(this, {
            pending: new _cuPendingState2.default(this),
            running: new _cuRunningState2.default(this),
            finished: new _cuFinishedState2.default(this),
            failed: new _cuFailedState2.default(this)
        });
        var rwHead = new _readWriteHead2.default(new _fileReader2.default(pathToTape), new _fileWriter2.default(pathToTape));
        // control unit
        this._cu = new _controlUnit2.default(rwHead, configuration);
        this._state = states.get(this).pending;
    }

    /**
     * @method run
     * run machine
     */

    _createClass(TuringMachine, [{
        key: 'run',
        value: function run() {
            _logger2.default.log('TuringMachine.run(): running...');
            this._state.run();
        }

        /**
         * @method  pause
         * pause machine
         */

    }, {
        key: 'pause',
        value: function pause() {
            _logger2.default.log('TuringMachine.pause(): pausing...');
            this._state.pause();
        }

        /**
         * @method  step
         * perform one more step
         */

    }, {
        key: 'step',
        value: function step() {
            _logger2.default.log('TuringMachine.step(): making a step...');
            this._state.step();
        }
    }, {
        key: 'getControlUnit',
        value: function getControlUnit() {
            return this._cu;
        }

        /**
         * set machine state to specified
         * @param {[type]} state [description]
         */

    }, {
        key: 'setState',
        value: function setState(state) {
            if (state instanceof _cuState2.default) {
                this._state = state;
            } else {
                throw new Error('TuringMachine.setState(): Can\'t set new state because of it\'s incorrect');
            }
        }

        /**
         * return pending state for the current machine
         * @return {State}
         */

    }, {
        key: 'getPendingState',
        value: function getPendingState() {
            return states.get(this).pending;
        }

        /**
         * return running state for the current machine
         * @return {State}
         */

    }, {
        key: 'getRunningState',
        value: function getRunningState() {
            return states.get(this).running;
        }

        /**
         * return finished state for the current machine
         * @return {State}
         */

    }, {
        key: 'getFinishedState',
        value: function getFinishedState() {
            return states.get(this).finished;
        }
    }, {
        key: 'getFailedState',
        value: function getFailedState() {
            return states.get(this).failed;
        }
    }]);

    return TuringMachine;
})();

exports.default = TuringMachine;