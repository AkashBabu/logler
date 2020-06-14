"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const defaults = __importStar(require("./defaults"));
const utils = __importStar(require("./utils"));
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
 */
class Logler {
    constructor(options) {
        options = options || {};
        this.options = {
            formatter: options.formatter || defaults.formatter,
            serializer: options.serializer || defaults.serializer,
            tokens: options.tokens || {},
            lineSeperator: options.lineSeperator || "\r\n",
            writer: options.writer || defaults.writer,
            colorLogs: options.colorLogs !== undefined ? !!options.colorLogs : defaults.colorLogs,
            onLog: options.onLog,
        };
    }
    /**
     * This method can be used to log tracing data.
     * This can include information that traces a request lifecycle
     * or the like
     */
    trace(...args) {
        this.print("trace", ...args);
    }
    /**
     * This method can be used to log debug information.
     * It will mostly be useful for a developer
     */
    debug(...args) {
        this.print("debug", ...args);
    }
    /**
     * This method can be used to log useful information
     * regarding system interaction and behaviour.
     * This log written by this method must be understandable
     * even by a non-developer person
     */
    info(...args) {
        this.print("info", ...args);
    }
    /**
     * Generic logging method
     */
    log(...args) {
        this.print("log", ...args);
    }
    /**
     * This method can be used to log warning messages.
     * Logs written by this method would typically include
     * handled exceptions. This is way of informing the log admin
     * regarding a failure, which needs to be fixed.
     */
    warn(...args) {
        this.print("warn", ...args);
    }
    /**
     * This method can be used to log unhandled exceptions.
     * Logs written by this method must be used for listing
     * down all the errors in the system.
     */
    error(...args) {
        this.print("error", ...args);
    }
    /**
     * These logs are very similar to error logs, but
     * the only difference lies in the priority that these
     * logs would create. Which means when a fatal logs is printed,
     * it needs to be notified to the concerned person for
     * immediate action.
     */
    fatal(...args) {
        this.print("fatal", ...args);
    }
    print(level, ...args) {
        const msg = this.options.formatter(Object.assign(Object.assign({}, utils.getResolvedTokens(this.options.tokens, level, ...args)), utils.getMandatoryTokens()), level, this.options.serializer(...args));
        const lineMsg = `${msg}${this.options.lineSeperator}`;
        this.options.writer(level, this.options.colorLogs ? lineMsg[utils.getColor(level)] : lineMsg);
        // Dispatches the log event to the listeners
        if (this.options.onLog) {
            this.options.onLog(level, { msg });
        }
    }
}
exports.default = Logler;
