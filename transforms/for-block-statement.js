module.exports = function(fileInfo, api, options) {
  const jscodeshift = api.jscodeshift;
  const printOptions = options.printOptions || {quote: 'single'};


  return jscodeshift(fileInfo.source)
    .find(jscodeshift.ForStatement)
    .filter(path => path.value.body.type !== 'BlockStatement')
    .replaceWith(path => {
      const curliedFor = jscodeshift.forStatement(
        path.value.init,
        path.value.test,
        path.value.update,
        jscodeshift.blockStatement([path.value.body])
      );
      curliedFor.comments = path.value.comments;
      return curliedFor;
    })
    .toSource(printOptions);
};
