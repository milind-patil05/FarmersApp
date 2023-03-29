module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['jest-hoist'],
    ['react-native-reanimated/plugin'],
    ['@babel/plugin-proposal-class-properties', {loose: false}],
    ['@babel/plugin-proposal-private-methods', {loose: false}],
    ['@babel/plugin-proposal-private-property-in-object', {loose: false}],
  ],
};
