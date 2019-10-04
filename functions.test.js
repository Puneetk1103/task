const taskObject = require('./functions');

test('test 1 pattern [[1,2,[3]],4]', () => {
    expect(taskObject.flatArray([[1,2,[3]],4])).toStrictEqual([1,2,3,4])
});

test('test 2 pattern []', () => {
    expect(taskObject.flatArray([])).toStrictEqual([])
});

test('test 3 pattern ["a","b"]', () => {
    expect(() => {taskObject.flatArray(['a','b'])}).toThrow()
});

test('test 4 pattern [1,2,[3,4],"b"]', () => {
    expect(() => {taskObject.flatArray([1,2,[3,4],"b"])}).toThrow()
});

test('testing', () =>{
    expect(taskObject.sendCoupon()).toBe(11)
})
