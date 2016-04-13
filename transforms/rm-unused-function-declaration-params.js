module.exports = function(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  return jscodeshift(fileInfo.source)
    .find(jscodeshift.FunctionDeclaration)
    .forEach(path => {
      const params = path.value.params;

      for (let i = params.length - 1; i >= 0; i--) {
        const isUnused = !jscodeshift(path.value.body)
          .find(jscodeshift.Identifier, {name: params[i].name})
          .size();

        if (i === params.length - 1 && isUnused) {
          params.pop();
        } else {
          break;
        }
      }

      return jscodeshift(path)
        .replaceWith(path => {
          const func = jscodeshift.functionDeclaration(
            path.value.id,
            params,
            path.value.body
          );

          func.comments = path.value.comments;

          return func;
        });
    })
    .toSource({quote: 'single'});
};
