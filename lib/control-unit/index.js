'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); // libraries

// inner dependencies

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _readWriteHead = require('../read-write-head');

var _readWriteHead2 = _interopRequireDefault(_readWriteHead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// constants
var Actions = {
    LEFT: 'L',
    RIGHT: 'R'
};
// variables
var defaultSettings = {
    initialState: '',
    finalState: '',
    states: [],
    alphabet: [],
    transitions: []
};
// convert a transition from serialize form to objective one
function splitTransition(transition) {
    var splitted = transition.split(';');

    return {
        state: splitted[0],
        output: splitted[1],
        action: splitted[2]
    };
}

function normalizeInput(input) {
    return input === '\n' || input === '' || input === '\r' ? '#' : input;
}

/**
 * @class ControlUnit
 */

var ControlUnit = (function () {
    /**
     * @constructor
     * @param  {Object} data
     */

    function ControlUnit(readWriteHead) {
        var settings = arguments.length <= 1 || arguments[1] === undefined ? defaultSettings : arguments[1];

        _classCallCheck(this, ControlUnit);

        if (!settings.states.length) {
            throw new Error('ControlUnit.constructor(): CU states aren\'t specified!');
        }
        if (!settings.alphabet.length) {
            throw new Error('ControlUnit.constructor(): CU alphabet isn\'t specified!');
        }
        if (_lodash2.default.indexOf(settings.states, settings.initialState) === -1) {
            throw new Error('ControlUnit.constructor(): CU initial state isn\'t specified or isn\'t from states collection!');
        }
        if (_lodash2.default.indexOf(settings.states, settings.finalState) === -1) {
            throw new Error('ControlUnit.constructor(): CU final state isn\'t specified or isn\'t from states collection!');
        }
        if (!Object.keys(settings.transitions).length) {
            throw new Error('ControlUnit.constructor(): There are no transitions specified for the CU!');
        }
        if (!(readWriteHead instanceof _readWriteHead2.default)) {
            throw new Error('ControlUnit.constructor(): An isntance of ReadWriteHead is mandatory to pass!');
        }

        this._settings = settings;
        this._state = settings.initialState;
        this._readWriteHead = readWriteHead;
    }

    /**
     * perform a transition to the next state
     * @return {Promise}
     */

    _createClass(ControlUnit, [{
        key: 'nextState',
        value: function nextState() {
            var _this = this;

            var _settings = this._settings;
            var states = _settings.states;
            var alphabet = _settings.alphabet;
            var transitions = _settings.transitions;
            var finalState = _settings.finalState;

            if (this._state === finalState) {
                _logger2.default.info('ControlUnit.nextState(): The current state is the final one. No action');
                return Promise.resolve(true);
            }

            _logger2.default.info('ControlUnit.nextState(): Switching to next state...');
            return this._readWriteHead.read().then(
            // make several checks according data integrity
            function (input) {
                var inputStateCombination = _this._state + ';' + normalizeInput(input),
                    transition = transitions[inputStateCombination],
                    detailedTransition = undefined;

                if (!_lodash2.default.isString(transition)) {
                    return Promise.reject('ControlUnit.nextState(): A transition from ' + inputStateCombination + ' isn\'t specified');
                }

                detailedTransition = splitTransition(transition);

                if (_lodash2.default.indexOf(states, detailedTransition.state) === -1) {
                    return Promise.reject('ControlUnit.nextState(): State ' + detailedTransition.state + ' isnt specified');
                }

                if (_lodash2.default.indexOf(alphabet, detailedTransition.output) === -1) {
                    _logger2.default.info('output: ' + detailedTransition.output);
                    return Promise.reject('ControlUnit.nextState(): Unrecognized output ' + detailedTransition.output + ' (unspecified within alphabet)');
                }

                _logger2.default.info('ControlUnit.nextState(): Switching state from ' + inputStateCombination + ' to ' + transition);

                return detailedTransition;
            }).then(
            // make transition to the next state
            function (transition) {
                _this._state = transition.state;
                return _this._readWriteHead.write(transition.output)
                // perform an action
                .then(function () {
                    if (transition.action === Actions.LEFT) {
                        _logger2.default.info('ControlUnit.nextState(): Move the read-write head carriage to the left');
                        _this._readWriteHead.left();
                    } else if (transition.action === Actions.RIGHT) {
                        _logger2.default.info('ControlUnit.nextState(): Move the read-write head carriage to the right');
                        _this._readWriteHead.right();
                    } else {
                        _logger2.default.info('ControlUnit.nextState(): Leave the read-write head carriage at the current position');
                    }

                    return transition.state === finalState;
                });
            }).catch(function onNextStateSwitchingError(err) {
                _logger2.default.error('ControlUnit.nextState(): ' + err);
                return err;
            });
        }
    }]);

    return ControlUnit;
})();

exports.default = ControlUnit;