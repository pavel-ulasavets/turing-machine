// libraries
import _ from 'lodash';
import logger from '../logger';
// inner dependencies
import ReadWriteHead from '../read-write-head';
// constants
const Actions = {
        LEFT: 'L',
        RIGHT: 'R'
    };
// variables
let defaultSettings = {
        initialState: '',
        finalState: '',
        states: [],
        alphabet: [],
        transitions: []
    };
// convert a transition from serialize form to objective one
function splitTransition(transition) {
    let splitted = transition.split(';');

    return {
        state: splitted[0],
        output: splitted[1],
        action: splitted[2]
    }
}

function normalizeInput(input) {
    return input === '\n' || input === '' || input === '\r' ? '#' : input;
}

/**
 * @class ControlUnit
 */
class ControlUnit {
    /**
     * @constructor
     * @param  {Object} data
     */
    constructor(readWriteHead, settings = defaultSettings) {
        if (!settings.states.length) {
            throw new Error('ControlUnit.constructor(): CU states aren\'t specified!');
        }
        if (!settings.alphabet.length) {
            throw new Error('ControlUnit.constructor(): CU alphabet isn\'t specified!');
        }
        if (_.indexOf(settings.states, settings.initialState) === -1) {
            throw new Error('ControlUnit.constructor(): CU initial state isn\'t specified or isn\'t from states collection!')
        }
        if (_.indexOf(settings.states, settings.finalState) === -1) {
            throw new Error('ControlUnit.constructor(): CU final state isn\'t specified or isn\'t from states collection!');
        }
        if (!Object.keys(settings.transitions).length) {
            throw new Error('ControlUnit.constructor(): There are no transitions specified for the CU!');
        }
        if (!(readWriteHead instanceof ReadWriteHead)) {
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
    nextState() {
        const {states, alphabet, transitions, finalState} = this._settings;

        if (this._state === finalState) {
            logger.info('ControlUnit.nextState(): The current state is the final one. No action');
            return Promise.resolve(true);
        }

        logger.info('ControlUnit.nextState(): Switching to next state...');
        return this._readWriteHead
            .read()
            .then(
                // make several checks according data integrity
                (input) => {
                    let inputStateCombination = `${this._state};${normalizeInput(input)}`,
                        transition = transitions[inputStateCombination],
                        detailedTransition;

                    if (!_.isString(transition)) {
                        return Promise.reject(`ControlUnit.nextState(): A transition from ${inputStateCombination} isn\'t specified`);
                    }

                    detailedTransition = splitTransition(transition);

                    if (_.indexOf(states, detailedTransition.state) === -1) {
                        return Promise.reject(`ControlUnit.nextState(): State ${detailedTransition.state} isnt specified`);
                    }

                    if (_.indexOf(alphabet, detailedTransition.output) === -1) {
                        logger.info('output: ' + detailedTransition.output);
                        return Promise.reject(`ControlUnit.nextState(): Unrecognized output ${detailedTransition.output} (unspecified within alphabet)`);
                    }

                    logger.info(`ControlUnit.nextState(): Switching state from ${inputStateCombination} to ${transition}`);

                    return detailedTransition;
                }
            )
            .then(
                // make transition to the next state
                (transition) => {
                    this._state = transition.state;
                    return this._readWriteHead
                        .write(transition.output)
                        // perform an action
                        .then(
                            () => {
                                if (transition.action === Actions.LEFT) {
                                    logger.info('ControlUnit.nextState(): Move the read-write head carriage to the left');
                                    this._readWriteHead.left();
                                } else if (transition.action === Actions.RIGHT) {
                                    logger.info('ControlUnit.nextState(): Move the read-write head carriage to the right');
                                    this._readWriteHead.right();
                                } else {
                                    logger.info('ControlUnit.nextState(): Leave the read-write head carriage at the current position');
                                }

                                return transition.state === finalState;
                            }
                        );
                }
            )
            .catch(
                function onNextStateSwitchingError(err) {
                    logger.error(`ControlUnit.nextState(): ${err}`);
                    return err;
                }
            )
    }
}

export default ControlUnit;
