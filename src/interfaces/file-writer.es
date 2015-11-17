// modules
import fs from 'fs';
import Writer from './writer';
import promisify from 'es6-promisify';
import logger from '../logger';

// promisified versions of fs API
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 @class Writer - define a standard interface of writing
 */
 class FileWriter extends Writer {
    constructor(path) {
        super();
        this._path = path;
    }
    /**
     * @method write - write a string at several position of output
     */
    write(position = 0, str = '') {
        return readFile(this._path, 'utf8')
            .then(
                (content) => {
                    let symbols = Array.from(content);
                    symbols.splice(position, 1, str);
                    return symbols.join('');
                }
            )
            .then(
                (toBeWritten) => {
                    return writeFile(this._path, toBeWritten)
                        .then(
                            () => {logger.info(`FileWriter.write(): ${toBeWritten} has been successfully written!`);}
                        );
                }
            )
    }
 }

 export default FileWriter;
