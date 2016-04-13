module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.FunctionExpression)
    .forEach(path => {
      const params = path.value.params;

      for (let i = params.length - 1; i >= 0; i--) {
        const isUnused = !jscodeshift(path.value.body)
          .find(jscodeshift.Identifier, {name: params[i].name})
          .size();

        if (i === params.length - 1 && isUnused) {
          params.pop();
        } else {
          return;
        }
      }

      return jscodeshift(path)
        .replaceWith(path => {
          const func = jscodeshift.functionExpression(
            path.value.id,
            params,
            path.value.body,
            path.value.generator,
            path.value.expression
          );

          func.comments = path.value.comments;

          return func;
        });
    })
    .toSource({quote: 'single'});
};
