function f() {
  var b = 123;
  var that = this;
  var a;

  setTimeout(function() {
    that.hey();
  }, 10);

  that.ho();
}

function g() {
  var some = this;//eslint-disable-line consistent-this

  setTimeout(function() {
    some.hey();
  }, 10);

  some.ho();
}
