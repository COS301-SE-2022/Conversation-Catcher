import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-share', () => {
  return {
    open: jest.fn(),
  };
});

jest.mock('react-native-audio-record', () => {
  return {
    open: jest.fn(),
  };
});

// jest.mock('@apollo/client', () => {
//   return {
//     open: jest.fn(),
//   };
// });
