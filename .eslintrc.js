module.exports = {
    'parser': 'babel-eslint',
    'extends': 'airbnb',
    'env': {
      'browser': true,
      'jest': true,
    },
    'plugins': [
        'react',
        'jsx-a11y',
        'import',
    ],
    'rules': {
      'class-methods-use-this': 'off',
    },
}
