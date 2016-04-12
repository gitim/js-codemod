module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.UnaryExpression)
    .filter(path => path.value.operator === '+')
    .replaceWith(path => jscodeshift.callExpression(
      jscodeshift.identifier('Number'),
      [path.value.argument]
    ))
    .toSource({quote: 'single'});
};
