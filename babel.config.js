module.exports = function (api) {
  // When building (using rollup) or running storybook (using babel-loader) we
  // want to compile for the web otherwise compile for node usage (within jest)
  const isWeb = api.caller((caller = {}) => {
    return ['babel-loader', 'rollup-plugin-babel'].includes(caller.name);
  });

  const runtimePreset = isWeb
    ? ['@shopify/babel-preset', {modules: false, typescript: true, react: true}]
    : [
        '@shopify/babel-preset',
        {
          modules: 'commonjs',
          typescript: true,
          react: true,
        },
      ];

  return {
    presets: [runtimePreset, ['@babel/preset-react']],
  };
};
