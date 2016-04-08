const DOUBLE_QUOTED = /^(\"|\')(.*)\1$/;

module.exports = function (fileInfo, api) {
    const j = api.jscodeshift;

    return j(fileInfo.source)
        .find(j.Literal)
        .filter(path => typeof path.value.raw === 'string' && DOUBLE_QUOTED.test(path.value.raw))
        .replaceWith(path => j.literal(path.value.value))
        .toSource({quote: 'single'});
};
