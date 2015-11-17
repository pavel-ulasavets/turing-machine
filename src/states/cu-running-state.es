import logger from '../logger';
import State from './cu-state';

class RunningState extends State {
    run() {
        logger.log('The machine is already in the "Running" state. Do nothing!');
    }

    step() {
        logger.log('The machine is already in the "Running" state. Do nothing!');
    }

    pause() {
        this._machine.setState(this._machine.getPendingState());
    }
}

export default RunningState;
