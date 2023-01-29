// https://juejin.cn/post/6979054290526535717#heading-6
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'perf',
        'docs',
        'style',
        'ci',
        'build',
        'test',
        'chore',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-enum': [2, 'always', ['packages','notes','base']],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
