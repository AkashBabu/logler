"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Default log format
 */
exports.formatter = ({ timestamp, fileName, lineNum, colNum }, level, msg) => `${timestamp} [${level.toUpperCase()}] <${fileName}:${lineNum}:${colNum}> ${msg}`;
/**
 * Serializes the given inputs arguments
 */
exports.serializer = (...args) => args.map((a) => (a instanceof Object ? JSON.stringify(a) : a)).join(" ");
exports.writer = (level, msg) => {
    utils_1.getLogLevelValue(level) < utils_1.getLogLevelValue("warn")
        ? process.stdout.write(msg)
        : process.stderr.write(msg);
};
exports.colorLogs = process.env.NODE_ENV === "production" ? false : true;
