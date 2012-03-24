var boundry = 22,
factorial = {
    "recursive": function () {
        return function fact(n){
            return 0 === n || 1 === n ? 1 : n * fact(n - 1);
        };
    },
    "memoized recursive": function () {
        return function fact(n){
            return 0 === n || 1 === n ? 1 : (n in fact) ? fact[n] : fact[n] = n * fact(n - 1);
        };
    },
    "primed memoized recursive": function () {
        function fact(n){
            return fact[n] || (fact[n] = n * fact(n - 1));
        }
        fact[0] = fact[1] = 1;
        return fact;
    },
    "iterative": function () {
        return function (n) {
            var i, f;
            for (i = f = 1; i < n + 1; i += 1){
                f *= i;
            }
            return f;
        };
    },
    "memoized iterative": function () {
        return function fact(n) {
            var i, f;
            if (fact[n]) {
                return fact[n];
            }
            for (i = f = 1; i < n + 1; i += 1){
                f *= i;
            }
            return fact[n] = f;
        };
    },
    "iterative reversed": function () {
        return function (n) {
            var i = 0, f = 1;
            while (n--) {
                f *= (i += 1);
            }
            return f;
        };
    }
};