function f() {
  var b = 123;
  var self = this;
  var a;

  setTimeout(function() {
    self.hey();
  }, 10);

  self.ho();
}

function g() {
  var some = this;

  setTimeout(function() {
    some.hey();
  }, 10);

  some.ho();
}
