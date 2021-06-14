import _ from "lodash";
import { useLocation, useHistory } from "react-router-dom";

/**
 *
 *get & prefixed string for http requests
 * @param {*} params Object
 * @returns String
 */
export const queryData = (params) => {
    const paramsKey = Object.keys(params);
    const paramsKeyLength = paramsKey.length;
    const ret = [];
    for (let i = 0; i < paramsKeyLength; i++) {
        const key = paramsKey[i];
        const value = params[key];

        /* encodeURIComponent "not done yet" */
        if (!_.isUndefined(value) && !_.isEmpty(value) && !_.isNull(value)) {
            if (_.isEmpty(ret)) ret.push(`?${key}=${value}`);
            else ret.push(`${key}=${value}`);
        }
    }
    return ret.join("&");
};

// A custom hook that builds on useLocation to parse
// the query string for you.
export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

/**
 *accepts classNames and returns joined string
 *
 * @param {any[]} [classNames=[]] multiple className
 */
export const classesString = (classNames = []) => classNames.filter((a) => a).join(" ");

// In Memory
const cache = new Map();

export const setData = (key, value) => {
    cache.set(key, value);
};

export const getData = (key) => {
    return cache.has(key) && cache.get(key);
};

// generate search params
export const generateSearchParams = ({ history, ...rest }) => {
    if ("URLSearchParams" in window) {
        var searchParams = new URLSearchParams(history.location.search);
        for (let key in rest) {
            if (rest[key]) searchParams.set(key, rest[key]);
        }
        var newRelativePathQuery = history.location.pathname + "?" + searchParams.toString();
        history.push(newRelativePathQuery);
    }
};
