class State {
    /**
     * Performs initial initialization
     * @param  {TuringMachine} machine
     */
    constructor(machine) {
        this._machine = machine;
    }

    /**
     * starts calculation process
     */
    run() {
        throw new Error('Not implemented!');
    }

    /**
     * peforms one more step of calculation
     * @return {[type]} [description]
     */
    step() {
        throw new Error('Not implemented!');
    }

    /**
     * pauses a calculation process
     * @return {[type]} [description]
     */
    pause() {
        throw new Error('Not implemented!');
    }
}

export default State;
