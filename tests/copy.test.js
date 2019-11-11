const testModule = require('../dist/index');
const copy = testModule.default;
// import * as copy from '../dist/index';
describe('test copy', () => {
    let testSet = new Set([1]);
    
    test('test copy set', () => {
        expect(Array.from(copy(testSet)).toString()).toBe(Array.from(testSet).toString());
    });
});