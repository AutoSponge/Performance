var strategy = {};
strategy["slice"] = function () {
    return Array.prototype.slice.call(arguments, 0);
};
strategy["cache slice"] = (function () {
    var slice = Array.prototype.slice;
    return function () {
        return slice.call(arguments, 0);
    };
}());
strategy["bound slice"] = (function () {
    var slice = Function.call.bind(Array.prototype.slice);
    return function () {
        return slice(arguments, 0);
    };
}());
strategy["for"] = function () {
    for (var args = [], i = 0, len = arguments.length; i < len; i += 1) {
        args[i] = arguments[i];
    }
    return args;
};
strategy["push"] = function () {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    return args;
};
strategy["cache push"] = (function () {
    var push = Array.prototype.push;
    return function () {
        var args = [];
        push.apply(args, arguments);
        return args;
    };
}());
strategy["bound push"] = (function () {
    var push = Function.apply.bind(Array.prototype.push);
    return function () {
        var args = [];
        push(args, arguments);
        return args;
    };
}());
strategy["concat"] = function () {
    return Array.prototype.concat.apply([], arguments)
};
strategy["cache concat"] = (function () {
    var concat = Array.prototype.concat;
    return function () {
        return concat.apply([], arguments);
    };
}());
strategy["bound concat"] = (function () {
    var concat = Function.apply.bind(Array.prototype.concat);
    return function () {
        return concat([], arguments);
    };
}());
