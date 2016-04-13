function f() {
  var a = 1;
  var b = 2;
  var d = Promise(cb);

  setTimeout(function() {
    return a + b;
  }, 10);

  for (var i in {a: 1, b: 2}) {
    console.log('!');
  }
}
