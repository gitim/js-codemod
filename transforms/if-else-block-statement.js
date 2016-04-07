module.exports = function(fileInfo, api, options) {
  const jscodeshift = api.jscodeshift;
  const printOptions = options.printOptions || {quote: 'single'};

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.IfStatement)
    .filter(path => path.value.consequent.type !== 'BlockStatement' || path.value.alternate && path.value.alternate.type !== 'BlockStatement')
    .replaceWith(path => {
      const curliedIf = jscodeshift.ifStatement(
        path.value.test,
        path.value.consequent.type !== 'BlockStatement'
          ? jscodeshift.blockStatement([path.value.consequent])
          : path.value.consequent,
        path.value.alternate && path.value.alternate.type !== 'BlockStatement' && path.value.alternate.type !== 'IfStatement'
          ? jscodeshift.blockStatement([path.value.alternate])
          : path.value.alternate
      );
      curliedIf.comments = path.value.comments;
      return curliedIf;
    })
    .toSource(printOptions);
};
