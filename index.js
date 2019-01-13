require('colors');

// Used merely for type support
const stream = require('stream'); // eslint-disable-line


// Default log format
const defaultFormat = (tokens, level, msg) => `${tokens.timestamp} <${level.toUpperCase()}> ${msg}`;

// Serializes the given inputs arguments
const defaultSerializer = (...args) => args.map(a => (a instanceof Object ? JSON.stringify(a) : a)).join(' ');

const defaultTokens = {
    timestamp: () => new Date().toISOString(),
};

const defaultLevels = {
    debug : 'cyan',
    info  : 'green',
    warn  : 'yellow',
    error : 'red',
};

const defaultWriter = msg => process.stdout.write(msg);

/**
 * Get tokens from getters
 * @param {Object} tokens Map of tokens vs function to get them
 * @param {String} level Log level
 * @param  {...any} args Log arguments
 *
 * @returns {Object} info
 */
function getTokens(tokens, level, ...args) {
    return Object.keys(tokens).reduce((info, token) => {
        info[token] = tokens[token](level, ...args); // eslint-disable-line
        return info;
    }, {});
}

/**
 * Creates a new instance of logger with the specified options
 *
 * This logger gives a flexibility of creating your own format
 * by specifying the format which shall be formed using js template,
 * and input to the format will be an object whose properties can be formed
 * via getter functions. Also note that you will have the flexibility of creating
 * your own serializer for the list of arguments sent to logger.
 * This way you may choose whether to serialize JSON object, whether to display
 * numbers or not etc

 *
 * @class
 */
class Logler {

    /**
     * This will initialize all the log level and create
     * all the required hooks
     *
     * @param {Object} opts
     * @param {function(tokens: Object, level: String, msg: String): String} [opts.format] Function that converts `tokens` object to
     *   required log string
     *
     * @param {Map<string, function>} [opts.tokens] Map of token name
     *   vs function that resolves to token
     *
     * @param {Map<string, string>} [opts.levels] Map of log level name vs color
     *
     * @param {String} [opts.serializer] function to convert all
     *  the arguments to loggable string
     *
     * @param {String} [opts.lineSeperator] line seperator for ex: \n, \r\n
     *
     * @param {function(level, {msg:string, args: any[]})} [opts.onLog] On Print
     *  event listener
     *
     * @param {function(msg)} [opts.writer] Function that write the serialized
     *  msg to the desired location
     *
     * @param {boolean} [opts.withColors] Msg with Colors, useful for console logging
     *
     * @param {Object} opts Options
     *
     * @constructor
     */
    constructor(opts = {}) {
        const { format = defaultFormat,
            serializer = defaultSerializer,
            levels = defaultLevels,
            tokens = defaultTokens,
            lineSeperator = '\r\n',
            writer = defaultWriter,
            withColors = false,
            onLog,
        } = opts;

        /**
         * Prints the list of args in the
         * specified format
         *
         * @param {String} level Log level
         * @param {String} color Log Color
         * @param  {...any} args List of arguments to be printed
         *
         * @returns {String} Serialized log
         *
         * @private
         */
        function print(level, color, ...args) {
            const msg = format(
                getTokens(tokens, level, ...args),
                level,
                serializer(...args),
            );

            const lineMsg = `${msg}${lineSeperator}`;
            writer(
                withColors
                    ? lineMsg[color]
                    : lineMsg,
            );

            return msg;
        }


        // Create functions for every log level
        Object.entries(levels).forEach(([level, logColor]) => {
            this[level] = this[level.toLowerCase()] = (...args) => {
                // Prints the message to the stream
                const msg = print(level, logColor, ...args);

                // Dispatches the log event to the listeners
                if (onLog) onLog(level, { serializedMsg: msg, args });

                return msg;
            };
        });
    }


}

module.exports = Logler;
