[1, 2, 3].forEach(function(elem, i) {
  console.log(i);
});

var f = function f() {
  return;
};

var g = function g(a, b, c, d) {
  return a + b + d;
};

var e = function e(a, b, c) {
  setTimeout(function() {
    setTimeout(function() {
      console.log(c);
    }, 10);
  }, 10);
};
