import { IGetColor, IGetLogLevelValue, IGetMandatoryTokens, IGetResolvedTokens } from "./interface";
export declare const getColor: IGetColor;
/**
 * Get tokens from getters
 */
export declare const getResolvedTokens: IGetResolvedTokens;
/**
 * Returns the mandatory tokens
 *
 * Returns the tokens that has to be
 * present in the `tokens` object passed
 * to `format` option
 */
export declare const getMandatoryTokens: IGetMandatoryTokens;
/**
 * Returns the priority for each log level.
 * This is especially useful when deciding to print the logs
 * based on the levels.
 * This can also be used to Print only critical logs in production
 */
export declare const getLogLevelValue: IGetLogLevelValue;
