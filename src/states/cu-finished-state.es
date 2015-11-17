import logger from '../logger';
import State from './cu-state';

class FinishedState extends State {
    run() {
        logger.log('The machine is in the final state! Do nothing!');
    }

    step() {
        logger.log('The machine is in the final state! Do nothing!');
    }

    pause() {
        logger.log('The machine is in the final state! Do nothing!');
    }
}

export default FinishedState;
