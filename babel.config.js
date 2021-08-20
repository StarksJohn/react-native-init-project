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
          '@dva': ['./src/dva/index.js'],
          '@react_intl': ['./src/react_intl/index.js'],
          '@context': ['./src/context/index.js'],
          '@routes': ['./src/routes/index.js'],
          '@useHooks': ['./src/useHooks/index.js'],
          '@/constant': ['./src/constants/index.js'],
          '@components': ['./src/components/index.js'],
          '@pages': ['./src/pages/index.js'],
          '@style': ['./src/style/index.js'],
          '@api': ['./src/api/index.js'],
          '@/res': ['./src/res/index.js']
        }
      }
    ]
  ]
}
