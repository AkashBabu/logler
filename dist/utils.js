"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.getColor = (() => {
    const colors = {
        trace: "cyan",
        debug: "cyan",
        info: "green",
        log: "green",
        warn: "yellow",
        error: "red",
        fatal: "red",
    };
    return (level) => colors[level];
})();
/**
 * Get tokens from getters
 */
exports.getTokens = (tokens, level, ...args) => {
    return Object.entries(tokens).reduce((info, [token, resolver]) => {
        info[token] = resolver(level, ...args);
        return info;
    }, {});
};
/**
 * Returns the mandatory tokens
 *
 * Returns the tokens that has to be
 * present in the `tokens` object passed
 * to `format` option
 */
exports.getMandatoryTokens = (() => {
    // Stack trace format :
    // https://v8.dev/docs/stack-trace-api
    const regex = /\((.*):(\d+):(\d+)\)$/;
    return () => {
        // Capture file & line_no
        const match = regex.exec(new Error().stack.split("\n")[4]);
        return {
            filePath: match[1],
            fileName: path_1.default.parse(match[1]).base,
            lineNum: +match[2],
            colNum: +match[3],
            timestamp: new Date().toISOString(),
        };
    };
})();
/**
 * Returns the priority for each log level.
 * This is especially useful when deciding to print the logs
 * based on the levels.
 * This can also be used to Print only critical logs in production
 */
exports.getLogLevelValue = (() => {
    const levelValues = {
        trace: 0,
        debug: 1,
        info: 2,
        log: 3,
        warn: 4,
        error: 5,
        fatal: 6,
    };
    return (level) => levelValues[level];
})();
