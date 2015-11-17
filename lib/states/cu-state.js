'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = (function () {
    /**
     * Performs initial initialization
     * @param  {TuringMachine} machine
     */

    function State(machine) {
        _classCallCheck(this, State);

        this._machine = machine;
    }

    /**
     * starts calculation process
     */

    _createClass(State, [{
        key: 'run',
        value: function run() {
            throw new Error('Not implemented!');
        }

        /**
         * peforms one more step of calculation
         * @return {[type]} [description]
         */

    }, {
        key: 'step',
        value: function step() {
            throw new Error('Not implemented!');
        }

        /**
         * pauses a calculation process
         * @return {[type]} [description]
         */

    }, {
        key: 'pause',
        value: function pause() {
            throw new Error('Not implemented!');
        }
    }]);

    return State;
})();

exports.default = State;