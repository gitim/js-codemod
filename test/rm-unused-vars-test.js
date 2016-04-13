function f() {
  var a = 1;
  var b = 2;
  var c = null;
  var d = Promise(cb);
  var e = undefined;

  setTimeout(function() {
    return a + b;
  }, 10);

  for (var i in {a: 1, b: 2}) {
    console.log('!');
  }
}
