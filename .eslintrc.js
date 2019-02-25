module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
  },
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: [ 2, 'never' ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-confusing-arrow': 'off',
    'max-len': 'off',
    'global-require': 'off',
    'no-tabs': ['off'],
    'import/prefer-default-export': ['off'],
    'object-curly-newline': ['off'],
    'newline-per-chained-call': 'off',
  },
}