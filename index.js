/**
 * @param {any} context -上下文
 * @param {Array} args -参数列表
 * @returns {Function}
 */
Function.prototype._bind = function (context, ...args) {
    if (typeof this != 'function') {
        throw new TypeError("error bind")
    }
    let self = this;
    let newFunc = function () {
       return self.apply(this instanceof self ? this : context, args.concat(Array.from(arguments)))
    }
    newFunc.prototype = Object.create(self.prototype);
    return newFunc
}

/**
 * @param {any} context -上下文
 * @param {Array} args -参数列表
 * @returns {any}
 */
Function.prototype._call = function (context, ...args) {
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
Function.prototype._apply = function (context, argArray) {
    context = context || Object.create(null);
    context.fn = this;
    let result = eval('context.fn(...argArray)');
    delete context.fn;
    return result;
}



/**
 * 
 */
Function.prototype._copy = function(){

}