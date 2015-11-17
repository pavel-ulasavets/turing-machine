import logger from '../logger';
import State from './cu-state';

class PendingState extends State {
    run() {
        this.step()
            .then(
                ({isEnd, isFailed}) => {
                    if (!(isFailed || isEnd)) {
                        logger.log('PendingState.run(): Make one more step');
                        this.run();
                    }
                }
            );
    }

    step() {
        let machine = this._machine,
            cu = machine.getControlUnit();

        // move machine to the running state
        machine.setState(machine.getRunningState());

        // and perform a transition to the next state of the CU
        return cu.nextState()
            .then(
                (isEnd) => {
                    let state;

                    if (isEnd) {
                        logger.log('PendingState.step(): The final state is achieved. Switching machine to the finished state...');
                        state = this._machine.getFinishedState();
                    } else {
                        logger.log('PendingState.step(): The finale state isn\'t achieved. Switching machine to the pending state...');
                        state = this._machine.getPendingState();
                    }

                    this._machine.setState(state);
                    return {isEnd};
                } 
            )
            .catch(
                (err) => {
                    logger.error(`PendingState.step(): The machine work has been terminated with "${err}"`);
                    this._machine.setState(this._machine.getFailedState());

                    // signalize that the machine has fallen into failed state
                    return {isFailed: true};
                }
            );
    }

    pause() {
        logger.log('PendingState.pause(): The machine is already in "Pending state"! Do nothing!');
    }
}

export default PendingState;
