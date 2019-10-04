let taskObject = require('./functions');
console.log("---Flatten Array -----");
let test = taskObject.flatArray([[1,2,[3]],4])
console.log(test);
console.log("---Show Coupon -----");
taskObject.sendCoupon()
