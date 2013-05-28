var strategy = {};
strategy["native"] = Function.prototype.bind;
//based on don't slice speedtest results
strategy["speed"] = function (/*obj[, arg1[, arg2...]]*/) {
    var _args = arguments,
        fn = this;
    if (typeof fn.apply !== "function") {
        throw new TypeError("Function.prototype.bind - object not callable");
    }
    function bound() {
        var args = [],
            i, len;
        for (i = 1, len = arguments.length + _args.length; i < len; i += 1) {
            args[i - 1] = i < _args.length ? _args[i] : arguments[i - _args.length];
        }
        return fn.apply(this instanceof fn ? this : _args[0], args);
    };
    bound.prototype = fn.prototype;
    //copy statics for binding a factory?
    bound.length = fn.length = _args.length;
    return bound;
};
//based on slice1 speedtest results
strategy["speed2"] = function (/*obj[, arg1[, arg2...]]*/) {
    var _args = arguments,
        fn = this;
    if (typeof fn.apply !== "function") {
        throw new TypeError("Function.prototype.bind - object not callable");
    }
    function bound() {
        var args = Array.call.apply(Array, _args);
        return fn.apply(this instanceof fn ? this : _args[0], args);
    };
    bound.prototype = fn.prototype;
    bound.length = fn.length = _args.length;
    return bound;
};
//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
strategy["mozilla"] = function (oThis) {
    if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
};
//https://github.com/kriskowal/es5-shim/issues/108
strategy["es5-shim"] = function (object, var_args) {
    //If IsCallable(Target) is false, throw a TypeError exception.
    if (typeof this != "function") {
        throw new TypeError("Function.prototype.bind called on incompatible " + this);
    }
    var __method = this, args = Array.prototype.slice.call(arguments, 1),
        _result = function () {
            return __method.apply(
                this instanceof _result ?
                    this ://The `object` value is ignored if the bound function is constructed using the new operator.
                    object,
                args.concat(Array.prototype.slice.call(arguments)));
        };
    if(__method.prototype) {
        _result.prototype = Object.create(__method.prototype);
    }
    return _result;
};