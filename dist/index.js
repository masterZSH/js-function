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
const getType = (variable) => Object.prototype.toString.call(variable);
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argumentsTag = '[object Arguments]';
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';
const canTraverse = {};
canTraverse[mapTag] =
    canTraverse[setTag] =
        canTraverse[arrayTag] =
            canTraverse[objectTag] =
                canTraverse[argumentsTag] = true;
const handleRegExp = (target) => {
    const { source, flags } = target;
    return new RegExp(source, flags);
};
const handleFunc = (target) => {
    return target;
};
const handleNotTraverse = (target) => {
    const tag = getType(target);
    const Ctor = target.constructor;
    switch (tag) {
        case numberTag:
        case stringTag:
            return new Ctor(target);
        case symbolTag:
            return new Object(Symbol.prototype.valueOf.call(target));
        case errorTag:
        case boolTag:
        case dateTag:
            return new Ctor(+target);
        case regexpTag:
            return handleRegExp(target);
        case funcTag:
            return handleFunc(target);
        default:
            return new Ctor(target);
    }
};
/**
 *
 */
const copy = function (target, map = new WeakMap()) {
    if (map.get(target))
        return target;
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    let cloneTarget;
    const type = getType(target);
    if (!canTraverse[type]) {
        // 处理不能遍历的对象
        return handleNotTraverse(target);
    }
    else {
        let ctor = target.constructor;
        cloneTarget = new ctor();
    }
    // 处理循环引用
    map.set(target, true);
    if (type === mapTag) {
        //处理Map
        target.forEach((item, key) => {
            cloneTarget.set(copy(key, map), copy(item, map));
        });
    }
    if (type === setTag) {
        //处理Set
        target.forEach((item) => {
            cloneTarget.add(copy(item, map));
        });
    }
    for (const prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = copy(target[prop], map);
        }
    }
    return cloneTarget;
};
exports.default = copy;
//# sourceMappingURL=index.js.map