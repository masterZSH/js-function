require('../dist/index');
describe('test apply', () => {
    let testFunc = function () {
        return [this, arguments];
    }
    let context = {
        foo: 1,
        bar: 2
    };
    let args = [
        1,
        2
    ];
    let testCallResult = testFunc.apply(context, args);

    test('test apply function context', () => {
        expect(testCallResult[0]).toBe(context);
    });

    test('test apply function arguments', () => {
        // convert Arguments to Array
        let argStr = Array.from(testCallResult[1]).toString();
        expect(argStr).toBe(args.toString());
    });

});