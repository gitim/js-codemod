module.exports = function(fileInfo, api, options) {
  const jscodeshift = api.jscodeshift;
  const printOptions = options.printOptions || {quote: 'single'};


  return jscodeshift(fileInfo.source)
    .find(jscodeshift.WhileStatement)
    .filter(path => path.value.body.type !== 'BlockStatement')
    .replaceWith(path => {
      const curliedWhile = jscodeshift.whileStatement(
        path.value.test,
        jscodeshift.blockStatement([path.value.body])
      );
      curliedWhile.comments = path.value.comments;
      return curliedWhile;
    })
    .toSource(printOptions);
};
