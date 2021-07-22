module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@RNProjectTools': ['./src/submodules/RNProjectTools/index.js'],
          '@/AllExports': ['./src/AllExports.js'],
          '@/dva': ['./src/dva/index.js'],
          '@/react_intl': ['./src/react-intl/index.js'],
          '@/context': ['./src/context/index.js'],
          '@/routes': ['./src/routes/index.js'],
          '@/useHooks': ['./src/useHooks/index.js'],
        },
      },
    ],
  ],
};
