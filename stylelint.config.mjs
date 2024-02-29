// @ts-check
/** @type {import('stylelint').Config} */
export default {
  extends: [
    '@quero/stylelint-config-base',
  ],
  rules: {
    'order/properties-alphabetical-order': false,
    'comment-empty-line-before': false,
    'custom-property-empty-line-before': false,
  },
};
