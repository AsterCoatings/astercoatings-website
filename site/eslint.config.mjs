import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// eslint-config-next already registers eslint-plugin-jsx-a11y; we only tighten its rules here.
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'playwright-report/**', 'test-results/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    },
  },
];
export default config;
