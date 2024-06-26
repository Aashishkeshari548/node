'use strict';

const common = require('../common');
if ((!common.hasCrypto) || (!common.hasIntl)) {
  common.skip('ESLint tests require crypto and Intl');
}

common.skipIfEslintMissing();

const RuleTester = require('../../tools/node_modules/eslint').RuleTester;
const rule = require('../../tools/eslint-rules/require-common-first');

new RuleTester({
  languageOptions: {
    sourceType: 'script',
  },
}).run('require-common-first', rule, {
  valid: [
    {
      code: 'require("common")\n' +
            'require("assert")'
    },
  ],
  invalid: [
    {
      code: 'require("assert")\n' +
            'require("common")',
      errors: [{ message: 'Mandatory module "common" must be loaded ' +
                          'before any other modules.' }]
    },
  ]
});
