import logger from './logger';
import ControlUnit from './control-unit';
import ReadWriteHead from './read-write-head';
import FileReader from './interfaces/file-reader';
import FileWriter from './interfaces/file-writer';
import PendingState from './states/cu-pending-state';
import RunningState from './states/cu-running-state';
import FinishedState from './states/cu-finished-state';
import FailedState from './states/cu-failed-state';
import State from './states/cu-state';

// variables
let states = new WeakMap();

/**
 * @class  TuringMachine
 */
class TuringMachine {
    constructor(configuration, pathToTape) {
        states.set(this, {
            pending: new PendingState(this),
            running: new RunningState(this),
            finished: new FinishedState(this),
            failed: new FailedState(this)
        });
        const rwHead = new ReadWriteHead(new FileReader(pathToTape), new FileWriter(pathToTape));
        // control unit
        this._cu = new ControlUnit(rwHead, configuration);
        this._state = states.get(this).pending;
    }

    /**
     * @method run
     * run machine
     */
    run() {
        logger.log('TuringMachine.run(): running...');
        this._state.run();
    }

    /**
     * @method  pause
     * pause machine
     */
    pause() {
        logger.log('TuringMachine.pause(): pausing...');
        this._state.pause();
    }

    /**
     * @method  step
     * perform one more step
     */
    step() {
        logger.log('TuringMachine.step(): making a step...');
        this._state.step();
    }

    getControlUnit() {
        return this._cu;
    }

    /**
     * set machine state to specified
     * @param {[type]} state [description]
     */
    setState(state) {
        if (state instanceof State) {
            this._state = state;
        } else {
            throw new Error('TuringMachine.setState(): Can\'t set new state because of it\'s incorrect');
        }
    }

    /**
     * return pending state for the current machine
     * @return {State}
     */
    getPendingState() {
        return states.get(this).pending;
    }

    /**
     * return running state for the current machine
     * @return {State}
     */
    getRunningState() {
        return states.get(this).running;
    }

    /**
     * return finished state for the current machine
     * @return {State}
     */
    getFinishedState() {
        return states.get(this).finished;
    }

    getFailedState() {
        return states.get(this).failed;
    }
}

export default TuringMachine;
