var strategy = {};
strategy[1] = function (el, arr) {
    return [el].concat(arr);
};
strategy[2] = function (el, arr) {
    var copy = arr.slice(0);
    return (copy.unshift(el), copy);
};
strategy[3] = function (el, arr) {
    arr.unshift(el);
    return arr;
};
strategy[4] = function (el, arr) {
    var copy = [el];
    return copy.push.apply(copy, arr);
};
strategy[5] = function (el, arr) {
    var copy = [el], i, len;
    for (i = 0, len = arr.length; i < len; i += 1) {
        copy[i + 1] = arr[i];
    }
    return copy;
};

var arr = [1,2,3,4,5];
strategy[1](0, arr);