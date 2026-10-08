import tseslint from 'typescript-eslint';
import lumuxA11y from './eslint/a11y.js';

export default tseslint.config(
  { ignores: ['dist/', 'dist-demo/', 'node_modules/', 'test-results/', 'playwright-report/'] },
  ...tseslint.configs.recommended,
  ...lumuxA11y,
);
