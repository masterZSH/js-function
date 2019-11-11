require('../dist/index');
describe('test call', () => {
    let testFunc = function () {
        return [this, arguments];
    }
    let context = {
        foo: 1,
        bar: 2
    };
    let args = [1, 2];
    let testCallResult = testFunc.call(context, ...args);
    test('test call function result', () => {
        expect(testCallResult[0]).toBe(context);
    });

    test('test apply function arguments', () => {
        // convert Arguments to Array
        let argStr = Array.from(testCallResult[1]).toString();
        expect(argStr).toBe(args.toString());
    });
});