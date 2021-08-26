module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
        }
      }
    ],
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~', // `~` 默认
        rootPathSuffix: 'src'
      }
    ]
  ]
}
