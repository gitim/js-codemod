function isEmptyStringLiteral(path) {
  return path.type === 'Literal' &&
         typeof path.value === 'string' &&
         path.value === '';
}

module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.BinaryExpression)
    .filter(path => (
      path.value.operator === '+' && (
        isEmptyStringLiteral(path.value.left) && !isEmptyStringLiteral(path.value.right) ||
        isEmptyStringLiteral(path.value.right) && !isEmptyStringLiteral(path.value.left)
      )
    ))
    .replaceWith(path => jscodeshift.callExpression(
      jscodeshift.identifier('String'),
      [isEmptyStringLiteral(path.value.left) ? path.value.right : path.value.left]
    ))
    .toSource({quote: 'single'});
};
