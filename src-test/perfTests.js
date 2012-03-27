require(['lib/domReady'], function (domReady) {
    var tests = {
        "factorial once (20)": function (i) {
            var f = factorial[i]();
            return function () {
                f(20);
            };
        },
        "factorial once dump cache": function factOnceTestDumpCache(i) {
            return function () {
                factorial[i]()(20);
            };
        },
        "factorial 1 - 21": function factTest(i) {
            var f = factorial[i]();
            return function () {
                var n;
                for (n = 1; n < boundary; n += 1) {
                    f(n);
                }
            }
        },
        "factorial 1 - 21 dump cache": function factTestDumpCache(i) {
            return function () {
                var n;
                for (n = 1; n < boundary; n += 1) {
                    factorial[i]()(n);
                }
            }
        }
    },
    $body,
    harness = function (name, suite, test) {
        var $b = $body || ($body = $("body")),
        $welcome = $("<h1>loading tests...</h1>").appendTo($b),
        $progress = $("<h1 style='display:none'></h1>").appendTo($b),
        $finish = $("<h1 style='display:none'></h1>").appendTo($b),
        $stats = $("<table style='display:none'><thead><tr><td>Name</td><td>Ops/sec</td></tr></thead></table>").appendTo($b),
        opt;

        for (opt in factorial) {
            if (factorial.hasOwnProperty(opt)) {
                suite.add(opt, test(opt));
            }
        }

        suite.on("start", function () {
            $welcome.hide();
            $progress.html(["running", name, "tests."].join(" ")).show();
        }).on("cycle", function() {
            $progress.get(0).insertAdjacentHTML("beforeend", ".");
        }).on("complete", function() {
            $progress.hide();
            $finish.html(["Fastest", name, ":", this.filter("fastest").pluck("name")].join(" ")).show();
            this.forEach(function (b) {
                $stats.append(["<tr><td>",
                    b.name,
                    "</td><td style='text-align: right;'>",
                    Benchmark.formatNumber(b.hz.toFixed(0)),
                    "</td></tr>"
                    ].join(""));
            });
            $stats.show();
        }).run({
            'async': true
        });
    };
    domReady(function () {
        var name;
        for (name in tests) {
            if (tests.hasOwnProperty(name)) {
                harness(name, new Benchmark.Suite, tests[name]);
            }
        }
    });
});