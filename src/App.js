/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { IntlWrapper } from '@react_intl'
import { dvaApp } from '@dva'
import AppProvider from './AppProvider.js'

const store = dvaApp.getStore()

const App = () => {
  useEffect(() => {
    console.log('App.js componentDidMount')
  }, [])

  return (
    <StoreProvider store={store}>
      <IntlWrapper>
        <AppProvider />
      </IntlWrapper>
    </StoreProvider>
  )
}

export default App
