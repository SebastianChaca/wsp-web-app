module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react/require-default-props': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-underscore-dangle': 'off',
    'no-explicit-any': 'off',
    'no-param-reassign': 0,
    '@typescript-eslint/naming-convention': ['error', {
      selector: 'variable',
      types: ['boolean'],
      format: ['camelCase'],

    }],
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
};
