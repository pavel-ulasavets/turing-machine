// libraries
import Promise from 'promise';
// interfaces to be used
import Writer from '../interfaces/writer';
import Reader from '../interfaces/reader';
/**
 * @class ReadWriteHead - a part of the Turing machine
 */
class ReadWriteHead {
    /**
     * @param {Reader} reader - a Reader interface implementation
     * @param {Writer} writer - a Writer interface implementation
     */
    constructor(reader, writer) {
        if (!(reader instanceof Reader && writer instanceof Writer)) {
            throw new Error('Incorrect params!');
        }

        this._reader = reader;
        this._writer = writer;
        this._position = 0;
    }

    /**
     * @method read
     * @param {Number} number -  a number of symbols to be read
     * @return {Promise} - a promise that will be resolved with read string
     */
    read(number = 1) {
        return Promise
            .resolve(this._reader.read(this._position, number));
    }

    /**
     * @method write
     * @param {String} str - a string to be written
     * @return {Promise} - a promise that will be resolve in cas of success or rejected otherwise
     */
    write(str = '') {
        return Promise
            .resolve(str && str.length ? this._writer.write(this._position, str) : '');
    }

    /**
     * @method left - shift a carriage on number positions to the left
     * if specified number > this._position the carriage is shifted to zero 
     *
     * @param a number of position to be shifted on
     * @return {Boolean} - true if the carriage is shifted successully, false otherwise
     */
    left(number = 1) {
        if (this._position > 0) {
            this._position = Math.max(this._position - number, 0);
        }
    }

    /**
     * @method right - shift a carriage on number positions to the right
     */
    right(number = 1) {
        this._position += number;
    }

}

export default ReadWriteHead;
