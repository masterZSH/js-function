/**
 * @param {Function} context -上下文
 * @param {Array} args -参数列表
 * @returns {Function}
 */

Function.prototype.bind = function (context: Function, ...args: Array<any>) {
    if (typeof this != 'function') {
        throw new TypeError("error bind")
    }
    let self: Function = this;
    let newFunc = function (this: Function) {
        return self.apply(this instanceof self ? this : context, args.concat(Array.from(arguments)))
    }
    // 原型链处理
    if(self.prototype){
        newFunc.prototype = Object.create(self.prototype);
    }
    return newFunc
}

export interface fnObject extends ObjectConstructor {
    fn: Function
}

/**
 * @param {any} context -上下文
 * @param {Array} args -参数列表
 * @returns {any}
 */
Function.prototype.call = function (context: fnObject, ...args: Array<any>) {
    context = context || Object.create(null);
    context.fn = this;
    let result = eval('context.fn(...args)');
    delete context.fn;
    return result;
}

/**
 * @param {any} context -上下文
 * @param {ArrayLike} argArray -参数数组
 * @returns {any}
 */
Function.prototype.apply = function (context: fnObject, argArray: Array<any>) {
    context = context || Object.create(null);
    context.fn = this;
    let result = eval('context.fn(...argArray)');
    delete context.fn;
    return result;
}



/**
 * 
 */
const copy = function (target: any, map: Map<Object, boolean> = new Map()) {
    if (map.get(target)) return target;
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    map.set(target, true);
    let cloneObject: any = Array.isArray(target) ? [] : {};
    for (const prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneObject[prop] = copy(target[prop], map);
        }
    }
    return cloneObject;
}

export default copy;
