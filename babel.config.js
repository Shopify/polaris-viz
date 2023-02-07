// this is required for `react-native` tests to work correctly
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],
  };
};
