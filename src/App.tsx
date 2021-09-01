/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { IntlWrapper } from '~react_intl'
import { dvaApp } from '~dva'
import AppProvider from './AppProvider'

const store = dvaApp.getStore()

const App = () => {
  useEffect(() => {
    console.log('App.js componentDidMount')
  }, [])

  // @ts-ignore
  return (
    <StoreProvider store={store}>
      <IntlWrapper>
        <AppProvider />
      </IntlWrapper>
    </StoreProvider>
  )
}

export default App
