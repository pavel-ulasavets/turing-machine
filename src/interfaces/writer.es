/**
 @class Writer - define a standard interface of writing
 */
 class Writer {
    /**
     * @method write - write a string at several position of output
     */
    write(position = 0, str = '') {
        throw new Error('Not implemented error!');
    }
 }

 export default Writer;
