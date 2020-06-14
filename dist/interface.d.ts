export declare type ILevel = "trace" | "debug" | "info" | "log" | "warn" | "error" | "fatal";
interface ITokens {
    [K: string]: (level: ILevel, ...args: any[]) => string;
}
interface IResolvedTokens {
    [token: string]: string | number;
}
export declare type IGetResolvedTokens = (tokens: ITokens, level: ILevel, ...args: any[]) => IResolvedTokens;
export declare type IGetColor = (level: ILevel) => string;
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
export declare type IGetMandatoryTokens = () => IMandatoryTokens;
export declare type IGetLogLevelValue = (level: ILevel) => number;
export declare type IFormatter = (mandatoryTokens: IMandatoryTokens & IResolvedTokens, level: ILevel, msg: string) => string;
export declare type ISerializer = (...args: any[]) => string;
export declare type IWriter = (level: ILevel, msg: string) => void;
export declare type ILogger = (...args: any[]) => void;
export declare type ILogler = {
    [level in ILevel]: ILogger;
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
export {};
