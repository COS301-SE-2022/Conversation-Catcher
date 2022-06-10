export default {
  displayName: 'client-ui',
  preset: 'react-native',
  testRunner: 'jest-jasmine2',
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '.svg': '@nrwl/react-native/plugins/jest/svg-mock',
  },
  transform: {
    '\\.(js|ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
      'react-native/jest/assetFileTransformer.js'
    ),
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-modal-dropdown|react-native-bouncy-checkbox|react-native-bouncy-checkbox-group|react-native-audio-record|react-native-animatable|react-native-modal|buffer|react-native-permissions|react-native-sound|react-native-document-picker|react-native-file-viewer)/)"
  ]
};
