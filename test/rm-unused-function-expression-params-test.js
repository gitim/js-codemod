[1, 2, 3].forEach(function(elem, i, arr) {
  console.log(i);
});

var f = function f(a, b, c, d) {
  return;
};

var g = function g(a, b, c, d, e, f) {
  return a + b + d;
};

var e = function e(a, b, c) {
  setTimeout(function() {
    setTimeout(function() {
      console.log(c);
    }, 10);
  }, 10);
};
