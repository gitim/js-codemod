function f(a, b, c, d) {
  return;
}

// some text
function g(a, b, c, d, e, f) {
  return a + b + d;
}

/**
 * [e description]
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @param  {[type]} c [description]
 * @return {[type]}   [description]
 */
function e(a, b, c) {
  setTimeout(function() {
    setTimeout(function() {
      console.log(c);
    }, 10);
  }, 10);
}
