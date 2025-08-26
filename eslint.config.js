import globals from 'globals';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores(['node_modules', '.husky/', '.git/', '**/*.log']),
  js.configs.recommended,
  eslintPluginPrettier,
  {
    files: ['**/*.js'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    extends: [eslintConfigPrettier],
    rules: {
      'arrow-body-style': ['warn', 'as-needed'],
      'no-debugger': 'warn',
      'no-duplicate-imports': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      semi: 'error',
      'semi-spacing': 'error',
      eqeqeq: 'warn',
      'object-shorthand': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: 'next',
        },
      ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
]);
