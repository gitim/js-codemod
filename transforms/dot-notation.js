const CAN_USE_IDENTIFIER = /^([a-zA-Z\_]+)$/;

module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.MemberExpression)
    .filter(path => path.value.property.type === 'Literal' && CAN_USE_IDENTIFIER.test(path.value.property.value))
    .replaceWith(path => jscodeshift.memberExpression(
      path.value.object,
      jscodeshift.identifier(path.value.property.value)
    ))
    .toSource({quote: 'single'});
};
