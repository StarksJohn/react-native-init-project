/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 * @format
 */
// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { IntlWrapper } from '~react_intl'
import { dvaApp } from '~dva'
import AppProvider from './src/AppProvider/AppProvider'
const store = dvaApp.getStore()
console.log('App.tsx store=', store)

const App = () => {
  return (
    // @ts-ignore
    <StoreProvider store={store}>
      <IntlWrapper>
        <AppProvider />
      </IntlWrapper>
    </StoreProvider>
  )
}

export default App
