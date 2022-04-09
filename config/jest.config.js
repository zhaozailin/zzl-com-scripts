const { resolve } = require('path');

module.exports = {
  verbose: true,
  rootDir: '../../../src',
  coverageDirectory: '../coverage',
  "collectCoverageFrom": [
    "scripts/*.{js,ts,jsx,tsx}",
    "scripts/**/*.{js,ts,jsx,tsx}",
  ],
  // 指定需要进行单元测试的文件匹配规则
  testMatch: [
    '<rootDir>/**/__tests__/*.test.js'
  ],
  setupFilesAfterEnv: [
    resolve(__dirname, '__tests__/setupTests.js')
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": resolve(__dirname, '__tests__/styleMock.js'),
    "\\.(css|less|scss)$": resolve(__dirname, '__tests__/styleMock.js')
  },
  testResultsProcessor: "jest-sonar-reporter"
};
