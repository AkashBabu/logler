export type ILevel = "trace" | "debug" | "info" | "log" | "warn" | "error" | "fatal";

interface ITokens {
  [K: string]: (level: ILevel, ...args: any[]) => string;
}

interface IResolvedTokens {
  [token: string]: string | number;
}

export type IGetResolvedTokens = (tokens: ITokens, level: ILevel, ...args: any[]) => IResolvedTokens;

export type IGetColor = (level: ILevel) => string;

export interface IMandatoryTokens {
  /** Absolute file path */
  filePath: string;

  /** File name */
  fileName: string;

  /** line number */
  lineNum: number;

  /** Column Number */
  colNum: number;

  /** ISO Time stamp */
  timestamp: string;
}

export type IGetMandatoryTokens = () => IMandatoryTokens;

export type IGetLogLevelValue = (level: ILevel) => number;

export type IFormatter = (mandatoryTokens: IMandatoryTokens & IResolvedTokens, level: ILevel, msg: string) => string;

export type ISerializer = (...args: any[]) => string;

export type IWriter = (level: ILevel, msg: string) => void;

export type ILogger = (...args: any[]) => void;

export type ILogler = {
  [level in ILevel]: ILogger
};

export interface IOnLogInfo {
  msg: string;
}

export interface IOptions {
formatter: IFormatter;
serializer: ISerializer;
tokens: ITokens;
lineSeperator: string;
writer: IWriter;
colorLogs: boolean;
onLog?: (level: ILevel, info: IOnLogInfo) => void;
}
