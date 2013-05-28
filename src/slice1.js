//http://jsperf.com/arguments-slice1
var strategy = {};
strategy["Array call"] = function () { //winner
    return Array.call.apply(Array, arguments);
};
strategy["slice"] = function () {
    return Array.prototype.slice.call(arguments, 1);
};
strategy["cache slice"] = (function () {
    var slice = Array.prototype.slice;
    return function () {
        return slice.call(arguments, 1);
    };
}());
strategy["bound slice"] = (function () {
    var slice = Function.call.bind(Array.prototype.slice);
    return function () {
        return slice(arguments, 1);
    };
}());
strategy["for"] = function () {
    for (var args = [], i = 1, len = arguments.length; i < len; i += 1) {
        args[i - 1] = arguments[i];
    }
    return args;
};
strategy["while"] = function () {
    var args = [], i = arguments.length;
    while (i > 0) {
        args[i - 2] = arguments[--i];
    }
    return args;
};
strategy["reduce"] = function () {
    return Array.prototype.reduce.call(arguments, function (args, e, i) {
        return i === 0 ? args : (args[args.length] = e, args);
    }, []);
};
strategy["filter"] = function () {
    return Array.prototype.filter.call(arguments, function (e, i) {
        if (i > 0) {
            return e;
        }
    });
};
