module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.ThrowStatement)
    .filter(path => path.value.argument.type !== 'NewExpression')
    .replaceWith(path => {
      const thrw = jscodeshift.throwStatement(
        jscodeshift.newExpression(
          jscodeshift.identifier('Error'),
          [path.value.argument]
        )
      );
      thrw.comments = path.value.comments;

      return thrw;
    })
    .toSource({quote: 'single'});
};
