import Sanitizer from 'sanitize-html';
import ILooseObject from "./interfaces/ILooseObject";
import Files from "./Files";
import * as fs from "fs";


const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

const sanitizerOptions: ILooseObject = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "recursiveEscape"
};

export const capitalize = (_string: string): string => {
    return _string.charAt(0).toUpperCase() + _string.slice(1);
};

export const lowerize = (_string: string): string => {
    return _string.charAt(0).toLowerCase() + _string.slice(1);
};

export const isObject = (val: any) => {
    if (val === null) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
};

export const saveLogToFile = (log: string, filePath: string) => {
    // create date
    const date: Date = new Date();
    const dateString: string = `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()} (${date.toDateString()})`;
    filePath = Files.projectBaseDir(process.env.DEV_LOG_DIR) + "\\" + dateString + ".log";
    fs.appendFile(filePath, log, (err) => {
        if (err) throw err;
    });
};

export const getParamNames = (func: (...args: any) => any): string[] => {
    const fnStr: string = func.toString().replace(STRIP_COMMENTS, '');
    let result: RegExpMatchArray | null = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) result = [];
    return result;
};

export const objectFilterOut = (obj: ILooseObject, key: string): ILooseObject => {
    const result: ILooseObject = {};
    for (const k in obj) {
        if (k !== key) result[k] = obj[k];
    }
    return result;
};

export const objectFilterIn = (obj: ILooseObject, key: string): ILooseObject => {
    const result: ILooseObject = {};
    for (const k in obj) {
        if (k === key) result[k] = obj[k];
    }
    return result;
};

export const _log = (logData: any, filePath: string = "/log/"): void => {
    saveLogToFile("|***LOG***|\n" + logData.toString() + "\n", filePath);
};

export const _either = <T>(either: T, or: T, _default?: T): T | undefined => (either) ? either : ((or) ? or : _default);

export const sanitizeObjValues = (obj: ILooseObject): ILooseObject => {
    for (const [key, value] of Object.entries(obj)) {
        if (isObject(obj[key])) sanitizeObjValues(obj[key]);
        else {
            obj[key] = Sanitizer(value, sanitizerOptions).toString().trim();
        }
    }
    return obj;
};

export const sanitizeString = (value: string): string => {
    return Sanitizer(value, sanitizerOptions).toString().trim();
};


export default {
    capitalize,
    lowerize,
    getParamNames,
    objectFilterOut,
    objectFilterIn,
    sanitizeString,
    log: _log,
    either: _either
};