import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  js.configs.recommended, // Replaces "eslint:recommended"
  eslintPluginPrettierRecommended, // Sets up both the plugin and config rules
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
