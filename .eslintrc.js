module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['@react-native-community', 'prettier'],
  plugins: ['react', 'react-native', 'import', 'prettier'],
  rules: {
    'prettier/prettier': 1,
    'react-native/no-unused-styles': 2,
  },
  globals: {
    __DEV__: true,
  },
  env: {
    'react-native/react-native': true,
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
    parserOptions: {
      project: './jsconfig.js',
    },
  },
};
