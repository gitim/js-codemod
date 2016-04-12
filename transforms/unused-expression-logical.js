module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.ExpressionStatement)
    .filter(path => (
      path.value.expression.type === 'LogicalExpression' &&
      path.parentPath.parentPath.value.type === 'BlockStatement'
    ))
    .replaceWith(path => {
      if (path.value.expression.operator === '&&') {
        return jscodeshift.ifStatement(
          path.value.expression.left,
          jscodeshift.blockStatement([jscodeshift.expressionStatement(
            path.value.expression.right
          )])
        );
      }
    })
    .toSource({quote: 'single'});
};
