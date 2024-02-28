import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    setupFiles: [
      './vitest-setup.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json', 'lcov'],
      thresholds: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50,
        autoUpdate: true,
        perFile: true,
      },
      include: [
        'components/**',
        'composables/**',
        'layouts/**',
        'middleware/**',
        'modules/**',
        'pages/**',
        'plugins/**',
        'server/**',
        'utils/**',
        'app.vue',
        'error.vue',
      ],
    },
  },
});
