module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            assets: './src/assets',
            components: './src/components',
            constants: './src/constants',
            context: './src/context',
            navigation: './src/navigation',
            screens: './src/screens',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],
    ],
  };
};