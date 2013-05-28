//http://jsperf.com/partial-speed-test
var strategy = {};
strategy[1] = function() {
    var args = Array.prototype.slice.call(arguments);
    var f = this;
    return function() {
        var inner_args = Array.prototype.slice.call(arguments);
        return f.apply(this, args.concat(inner_args))
    };
};
strategy[2] = function() {
    var args = arguments;
    var f = this;
    return function() {
        var arr = [];
        arr.push.apply(arr, args);
        arr.push.apply(arr, arguments);
        return f.apply(this, arr)
    };
};
strategy[3] = function() {
    var args = arguments;
    var alen = arguments.length;
    var f = this;
    return function() {
        var arr = [];
        for (var i = 0, len = alen + arguments.length; i < len; i += 1) {
            arr[arr.length] = i < alen ? args[i] : arguments[i - alen];
        }
        return f.apply(this, arr);
    };
};
strategy[4] = function() {
    var args = arguments;
    var alen = arguments.length;
    var f = this;
    return function() {
        var arr = [], i, len;
        for (i = 0; i < alen; i += 1) {
            arr[i] = args[i];
        }
        for (; i < alen + arguments.length; i += 1) {
            arr[i] = arguments[i - alen];
        }
        return f.apply(this, arr);
    };
};


var plus_two = function(x,y) { return x+y; };

Function.prototype.partial = strategy[1];
var add_three = plus_two.partial(3);
add_three(4); // 7