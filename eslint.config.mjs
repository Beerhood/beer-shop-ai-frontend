import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [js.configs.recommended],
  },
  ...tseslint.configs.recommended.map((cfg) => ({
    ...cfg,
    files: ['src/**/*.{ts,mts,cts}'],
  })),

  {
    files: ['src/**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: [json.configs.recommended],
  },

  {
    files: ['src/**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: [json.configs.recommended],
  },

  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
  },
]);
