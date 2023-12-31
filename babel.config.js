module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      ['module-resolver', 
        {
          'root': ['./'],
          'alias': {
           '@': './src',
          },
          'extensions': ['.tsx', 'ts', 'js', 'jsx'], 
        }
      ]
    ],
  };
};
