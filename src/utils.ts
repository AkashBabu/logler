import path from "path";
import { IGetColor, IGetLogLevelValue, IGetMandatoryTokens, IGetResolvedTokens, ILevel } from "./interface";

export const getColor: IGetColor = (() => {
  const colors: {
    [level in ILevel]: string;
  } = {
    trace: "cyan",
    debug: "cyan",
    info: "green",
    log: "green",
    warn: "yellow",
    error: "red",
    fatal: "red",
  };

  return (level: ILevel) => colors[level];
})();

/**
 * Get tokens from getters
 */
export const getResolvedTokens: IGetResolvedTokens = (tokens, level, ...args) => {
  return Object.entries(tokens).reduce((info, [token, resolver]) => {
    info[token] = resolver(level, ...args);
    return info;
  }, {} as { [K: string]: string });
};

/**
 * Returns the mandatory tokens
 *
 * Returns the tokens that has to be
 * present in the `tokens` object passed
 * to `format` option
 */
export const getMandatoryTokens: IGetMandatoryTokens = (() => {
  // Stack trace format :
  // https://v8.dev/docs/stack-trace-api
  const regex = /\((.*):(\d+):(\d+)\)$/;

  return () => {
    // Capture file & line_no
    const match = regex.exec((new Error() as any).stack.split("\n")[4]) as RegExpExecArray;

    return {
      filePath: match[1],
      fileName: path.parse(match[1]).base,
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
export const getLogLevelValue: IGetLogLevelValue = (() => {
  const levelValues: {
    [level in ILevel]: number
  } = {
    trace: 0,
    debug: 1,
    info: 2,
    log: 3,
    warn: 4,
    error: 5,
    fatal: 6,
  };

  return (level: ILevel) => levelValues[level];
})();
