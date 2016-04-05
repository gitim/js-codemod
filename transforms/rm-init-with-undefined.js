module.exports = function(fileInfo, api, options) {
  const jscodeshift = api.jscodeshift;
  const printOptions = options.printOptions || {quote: 'single'};

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.VariableDeclaration)
    .filter(path => path.value.declarations[0].init && path.value.declarations[0].init.name === 'undefined')
    .forEach(path => {
      path.value.declarations[0].init = null;
    })
    .toSource(printOptions);
};
