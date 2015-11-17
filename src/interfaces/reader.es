/**
 * @class Reader - define a standart interface for reading
 */
class Reader {
    /**
     * @method read
     * @param {Number} position - position where reading should be started
     * @param {Number} number - a number of symbols to be read
     */
    read(position = 0, number = 1) {
        throw new Error('Not implemented error!');
    }
}

export default Reader;
