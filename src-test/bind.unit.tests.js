module("bind");
var opt;
function testStrategy(name){
    return function () {
        Function.prototype.bind = strategy[name];
        var obj = {
            val: 81,
            getVal: function () {
                return this.val;
            }
        };
        this.val = 9;
        var getVal = obj.getVal;
        var boundGetVal = getVal.bind(obj);

        //setup binding function
        ok("getVal works as a method of obj", obj.getVal() === 81);
        ok("getVal operates on global when not called as a method of obj", getVal() === 9);
        ok("boundGetVal operates as if called as a method of obj", boundGetVal() === 81);

        //setup 'currying'
        var slice = function () {
            return Array.prototype.slice.call(arguments);
        };
        var leadingArgument = slice.bind(null, 37);

        ok("slice works as expected", slice(1,2,3).toString() === "1,2,3");
        ok("partial application no arguments test", leadingArgument().toString() === "37");
        ok("partial application test", leadingArgument(1, 2, 3).toString() === "37,1,2,3");

        //setup bound functions as constructors
        var Point = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Point.prototype.toString = function() {
            return this.x + "," + this.y;
        };
        var p = new Point(1, 2);

        ok("new Point", p.toString() === "1,2");

        //setup
        var emptyObj = {};
        var YAxisPoint = Point.bind(emptyObj, 0 /* x */);
        var axisPoint = new YAxisPoint(5);

        ok("new Point with pre-defined X", axisPoint.toString() === "0,5");
        ok("instanceof Point", axisPoint instanceof Point === true);
        // false with native bind; true, when using the polyfill
        //console.assert(axisPoint instanceof YAxisPoint === /\[native code\]/.test(Function.prototype.bind.toString()) ? false : true, "instanceof YAxisPoint");
        ok("instanceof YAxisPoint", axisPoint instanceof YAxisPoint === true);

        YAxisPoint(13);
        ok("Can still be called as a normal function (X)", emptyObj.x === 0);
        ok("Can still be called as a normal function (Y)", emptyObj.y === 13);
    };
}

for (opt in strategy) {
    if (strategy.hasOwnProperty(opt)) {
        test(opt, testStrategy(opt));
    }
}
