import "colors";
import { ILogler, IOptions } from "./interface";
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
export default class Logler implements ILogler {
    private options;
    constructor(options?: Partial<IOptions>);
    /**
     * This method can be used to log tracing data.
     * This can include information that traces a request lifecycle
     * or the like
     */
    trace(...args: any[]): void;
    /**
     * This method can be used to log debug information.
     * It will mostly be useful for a developer
     */
    debug(...args: any[]): void;
    /**
     * This method can be used to log useful information
     * regarding system interaction and behaviour.
     * This log written by this method must be understandable
     * even by a non-developer person
     */
    info(...args: any[]): void;
    /**
     * Generic logging method
     */
    log(...args: any[]): void;
    /**
     * This method can be used to log warning messages.
     * Logs written by this method would typically include
     * handled exceptions. This is way of informing the log admin
     * regarding a failure, which needs to be fixed.
     */
    warn(...args: any[]): void;
    /**
     * This method can be used to log unhandled exceptions.
     * Logs written by this method must be used for listing
     * down all the errors in the system.
     */
    error(...args: any[]): void;
    /**
     * These logs are very similar to error logs, but
     * the only difference lies in the priority that these
     * logs would create. Which means when a fatal logs is printed,
     * it needs to be notified to the concerned person for
     * immediate action.
     */
    fatal(...args: any[]): void;
    private print;
}
