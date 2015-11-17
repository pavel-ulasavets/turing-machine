import logger from '../logger';
import State from './cu-state';

class FailedState extends State {
    run() {
        logger.log('FailedState.run(): The machine has fallen into failed state. Do nothing!');
    }

    step() {
        logger.log('FailedState.run(): The machine has fallen into failed state. Do nothing!');
    }

    pause() {
        logger.log('FailedState.run(): The machine has fallen into failed state. Do nothing!');
    }
}

export default FailedState;
