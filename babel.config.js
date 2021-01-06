const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: [path.resolve('./src')],
        extensions: ['.js', '.jsx', '.tsx', '.json', '.ts', '.graphql'],
        alias: {
          '~': './src',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
