// @ts-check
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@quero/eslint-config-nuxt'],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // Disable this rule because it's not working well with Vue 3 props
        '@typescript-eslint/no-unsafe-argument': 'off',
      },
    },
  ],
};
