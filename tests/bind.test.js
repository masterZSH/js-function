require('../dist/index');
describe('test bind', () => {
    let testFunc = function () {
        var result = [this];
        Array.prototype.push.apply(result, arguments);
        return result;
    }
    let context = {
        foo: 1,
        bar: 2
    };
    let testBindFunc = testFunc.bind(context);
    test('test bind function prototype', () => {
        expect(testBindFunc.prototype.__proto__).toBe(testFunc.prototype);
    });
    test('test bind function context', () => {
        expect(testBindFunc()[0]).toBe(context);
    });
});