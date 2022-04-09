'use strict';

module.exports = {

  types: [
    {
      value: 'feat',
      name : '✨  feat:     A new feature'
    },
    {
      value: 'fix',
      name : '🐞  fix:      A bug fix，修复bug'
    },
    {
      value: 'refactor',
      name : '🛠  refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'docs',
      name : '📚  docs:     Documentation only changes'
    },
    {
      value: 'test',
      name : '🏁  test:     Add missing tests or correcting existing tests'
    },
    {
      value: 'publish',
      name : 'publish: Add new version',
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
