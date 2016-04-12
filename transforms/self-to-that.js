module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.VariableDeclaration)
    .filter(path => path.value.declarations[0].init &&
      path.value.declarations[0].init.type === 'ThisExpression')
    .forEach(path => {
      if (path.value.declarations[0].id.name === 'self') {
        return jscodeshift(path)
          .closestScope()
          .find(jscodeshift.Identifier, {name: path.value.declarations[0].id.name})
          .replaceWith(path => jscodeshift.identifier('that'));
      } else if (path.value.declarations[0].id.name !== 'that') {
        const comment = jscodeshift.commentLine('eslint-disable-line consistent-this');

        comment.leading = false;
        comment.trailing = true;

        path.value.comments = [comment];
      }
    })
    .toSource({quote: 'single'});
};
