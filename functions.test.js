const functions = require('./functions');

test('test 1 pattern [[1,2,[3]],4]', () => {
    expect(functions.flatarray([[1,2,[3]],4])).toStrictEqual([1,2,3,4])
});

test('test 2 pattern []', () => {
    expect(functions.flatarray([])).toStrictEqual([])
});

test('test 3 pattern ["a","b"]', () => {
    expect(() => {functions.flatarray(['a','b'])}).toThrow()
});

test('test 4 pattern [1,2,[3,4],"b"]', () => {
    expect(() => {functions.flatarray([1,2,[3,4],"b"])}).toThrow()
});

test('testing', () =>{
    expect(functions.SendCoupon()).toBe(11)
})