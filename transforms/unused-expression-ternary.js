module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.ExpressionStatement)
    .filter(path => (
      path.value.expression.type === 'ConditionalExpression' &&
      path.parentPath.parentPath.value.type === 'BlockStatement'
    ))
    .replaceWith(path => jscodeshift.ifStatement(
      path.value.expression.test,
      jscodeshift.blockStatement([jscodeshift.expressionStatement(
        path.value.expression.consequent
      )]),
      jscodeshift.blockStatement([jscodeshift.expressionStatement(
        path.value.expression.alternate
      )])
    ))
    .toSource({quote: 'single'});
};
