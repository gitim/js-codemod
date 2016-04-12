const COMPARE_OPERATORS = ['>', '>=', '<', '<=', '==', '!=', '===', '!=='];
const OPOSITE_OPERATOR = {
  '>': '<',
  '>=': '<=',
  '<': '>',
  '<=': '>=',
};

module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.BinaryExpression)
    .filter(path => path.value.left.type === 'Literal' &&
      path.value.right.type !== 'Literal' &&
      COMPARE_OPERATORS.indexOf(path.value.operator) !== -1
    )
    .replaceWith(path => jscodeshift.binaryExpression(
      OPOSITE_OPERATOR[path.value.operator]
        ? OPOSITE_OPERATOR[path.value.operator]
        : path.value.operator,
      path.value.right,
      path.value.left
    ))
    .toSource({quote: 'single'});
};
