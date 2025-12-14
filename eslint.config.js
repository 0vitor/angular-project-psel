import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['cypress/**', '**/*.html', '**/*.spec.ts', 'cypress.config.ts'],
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angular,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],

          pathGroups: [
            // Angular
            {
              pattern: '@angular/**',
              group: 'external',
              position: 'before',
            },

            // PrimeNG
            {
              pattern: 'primeng/**',
              group: 'external',
              position: 'after',
            },

            // RxJS
            {
              pattern: 'rxjs/**',
              group: 'external',
              position: 'after',
            },

            // Aliases internos
            {
              pattern: '@models/**',
              group: 'internal',
            },
            {
              pattern: '@services/**',
              group: 'internal',
            },
            {
              pattern: '@components/**',
              group: 'internal',
            },
            {
              pattern: '@env/**',
              group: 'internal',
            },
          ],

          pathGroupsExcludedImportTypes: ['builtin'],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  {
    files: ['**/*.component.html'],
    languageOptions: {
      parser: angularTemplate.parser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    rules: {},
  },
];
