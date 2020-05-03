import { IFormatter, ILevel, IMandatoryTokens, ISerializer, IWriter } from "./interface";
import { getLogLevelValue } from "./utils";

/**
 * Default log format
 */
export const formatter: IFormatter = ({ timestamp, fileName, lineNum, colNum }: IMandatoryTokens, level: ILevel, msg: string) => `${timestamp} [${level.toUpperCase()}] <${fileName}:${lineNum}:${colNum}> ${msg}`;

/**
 * Serializes the given inputs arguments
 */
export const serializer: ISerializer = (...args: any[]) => args.map((a) => (a instanceof Object ? JSON.stringify(a) : a)).join(" ");

export const writer: IWriter = (level, msg) => {
  getLogLevelValue(level) < getLogLevelValue("warn")
    ? process.stdout.write(msg)
    : process.stderr.write(msg);
};

export const colorLogs = process.env.NODE_ENV === "production" ? false : true;
