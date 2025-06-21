// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-community' +
      '|expo' +
      '|expo-av' +
      '|@expo' +
      '|@unimodules' +
      '|@react-native-async-storage/async-storage)' +
    ')',
  ],
};
