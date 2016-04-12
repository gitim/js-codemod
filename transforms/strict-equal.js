function isStringLiteral(path) {
  return path.type === 'Literal' &&
         typeof path.value === 'string' &&
         isNaN(Number(path.value));
}

function isIndexOfCall(path) {
  return path.type === 'CallExpression' &&
         path.callee.property &&
         path.callee.property.name === 'indexOf';
}

module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.BinaryExpression)
    .filter(path => (
      (path.value.operator === '==' || path.value.operator == '!=') && (
        isStringLiteral(path.value.left) || isStringLiteral(path.value.right) ||
        isIndexOfCall(path.value.left) || isIndexOfCall(path.value.right)
      )
    ))
    .replaceWith(path => jscodeshift.binaryExpression(
      path.value.operator + '=',
      path.value.left,
      path.value.right
    ))
    .toSource({quote: 'single'});
};
