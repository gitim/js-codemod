function isSimpleType(node) {
  return node.type === 'Literal' && (
    typeof node.value === 'string' ||
    typeof node.value === 'number' ||
    node.value === null
    ) || (
      node.type === 'Identifier' && node.name === 'undefined'
    );
}

module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.VariableDeclaration)
    .filter(path => path.value.declarations.length === 1 &&
      path.parent.value.type !== 'ForStatement' &&
      path.parent.value.type !== 'ForInStatement' && (
      path.value.declarations[0].init === null  ||
      isSimpleType(path.value.declarations[0].init)
    ))
    .forEach(path => {
      const isUnused = !jscodeshift(path)
        .closestScope()
        .find(jscodeshift.Identifier, {name: path.value.declarations[0].id.name})
        .filter(path => path.parentPath.value.type !== 'VariableDeclarator')
        .size();

      if (isUnused) {
        jscodeshift(path).remove();
      }
    })
    .toSource({quote: 'single'});
};
