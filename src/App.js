/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import {} from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { IntlWrapper } from '@/AllExports';
import dvaApp from './dva/dvaApp.js';
import AppProvider from './AppProvider.js';

const store = dvaApp.getStore();

const App = () => {
  useEffect(() => {
    console.log('App.js componentDidMount');
  }, []);

  return (
    <StoreProvider store={store}>
      <IntlWrapper>
        <AppProvider />
      </IntlWrapper>
    </StoreProvider>
  );
};

export default App;
