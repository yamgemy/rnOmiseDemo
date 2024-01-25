module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        'module-resolver',
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            '@src': './src',
            '@constants': './src/constants',
            '@navigators': './src/navigators',
            '@screens': './src/screens',
            "@animations": './src/animations',
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@store": "./src/store",
            "@selectors": './src/selectors'
          }
        }
      ],
      'react-native-reanimated/plugin',
    ],
  };
}
