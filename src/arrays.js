export const isArray = obj => obj !== undefined && Object.prototype.toString.call(obj) === '[object Array]';
export const isEmptyArray = obj => isArray(obj) && obj.length === 0;