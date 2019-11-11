"use strict";
/**
 * @param {Function} context -上下文
 * @param {Array} args -参数列表
 * @returns {Function}
 */
Object.defineProperty(exports, "__esModule", { value: true });
Function.prototype.bind = function (context, ...args) {
    if (typeof this != 'function') {
        throw new TypeError("error bind");
    }
    let self = this;
    let newFunc = function () {
        return self.apply(this instanceof self ? this : context, args.concat(Array.from(arguments)));
    };
    // 原型链处理
    if (self.prototype) {
        newFunc.prototype = Object.create(self.prototype);
    }
    return newFunc;
};
/**
 * @param {any} context -上下文
 * @param {Array} args -参数列表
 * @returns {any}
 */
Function.prototype.call = function (context, ...args) {
    context = context || Object.create(null);
    context.fn = this;
    let result = eval('context.fn(...args)');
    delete context.fn;
    return result;
};
/**
 * @param {any} context -上下文
 * @param {ArrayLike} argArray -参数数组
 * @returns {any}
 */
Function.prototype.apply = function (context, argArray) {
    context = context || Object.create(null);
    context.fn = this;
    let result = eval('context.fn(...argArray)');
    delete context.fn;
    return result;
};
/**
 *
 */
const copy = function (target, map = new Map()) {
    if (map.get(target))
        return target;
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    map.set(target, true);
    let cloneObject = Array.isArray(target) ? [] : {};
    for (const prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneObject[prop] = copy(target[prop], map);
        }
    }
    return cloneObject;
};
exports.default = copy;
//# sourceMappingURL=index.js.map


