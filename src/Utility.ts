// tslint:disable:ban-templates

import Os from 'os';
import ILooseObject from './interfaces/ILooseObject';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

export const capitalize = (_string: string): string => {
  return _string.charAt(0).toUpperCase() + _string.slice(1);
};

export const capitalizeSentence = (_string: string): any => {
  return _string.split(' ').map(str => capitalize(str)).join(' ');
};

export const lowerlize = (_string: string): string => {
  return _string.charAt(0).toLowerCase() + _string.slice(1);
};

export const stringIsEmail = (_string: string): boolean => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(_string);
};

export const getParamNames = (func: Function): string[] => {
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

export const objectIsEmpty = (obj: ILooseObject): boolean => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const randomHexString = (size: number): String => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export const _either = <T> (either: T, or: T, _default?: T): T => ((either) ? either : ((or) ? or : _default) as T);

export const baseURI = (fromOs = false) => {
  return (process.env.BASE_URI && fromOs) ? process.env.BASE_URI : 'https://' + Os.hostname();
};

export const packIncludes = (includeName: string, obj: ILooseObject) => {
  const packed: ILooseObject = {};
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (key.includes(includeName)) {
      packed[key.replace(`${includeName}.`, '')] = obj[key];
    }
  }
  return packed[includeName] ? packed[includeName] : packed;
};

export default {
  capitalizeFirstLetter: capitalize,
  lowerlize,
  getParamNames,
  objectFilterOut,
  objectFilterIn,
  objectIsEmpty,
  _either,
};