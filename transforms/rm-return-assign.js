module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.ReturnStatement)
    .filter(path => path.value.argument && path.value.argument.type === 'AssignmentExpression')
    .replaceWith(path => [
      jscodeshift.expressionStatement(path.value.argument),
      jscodeshift.returnStatement(path.value.argument.left),
    ])
    .toSource({quote: 'single'});
};
