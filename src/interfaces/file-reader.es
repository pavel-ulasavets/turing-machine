// libraries
import fs from 'fs';
import promisify from 'es6-promisify';
import logger from '../logger';
// other entities
import Reader from './reader';

const open = promisify(fs.open);
const read = promisify(fs.read);
const readFile = promisify(fs.readFile);

class FileReader extends Reader {
    /**
     * @param {String} path - a path to the file to read from
     */
    constructor(path) {
        super();
        this._path = path;
    }

    /**
     * @method read
     * @param {Number} position - position where reading should be started
     * @param {Number} number - a number of symbols to be read
     */
    read(position = 0, number = 1) {
        logger.info(`FileReader.read(): Reading of ${number} symbol(-s) from ${this._path} at position ${position} ...`);
        return readFile(this._path, 'utf8')
            .then(
                (content) => {
                    if (content.length > (position + number)) {
                        return content.slice(position,  position + number);
                    } else {
                        // at this case we consider that the end of the file has been achieved
                        // it's the marker of the end of line
                        return '\n';
                    }
                }
            );
    }
}

export default FileReader;
