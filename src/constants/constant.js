import React from 'react';
import { constant } from 'react-native-common-tools';
export default Object.freeze({
  fakeData: false, //! !__DEV__,
  sentryLog: true,
  ...constant,
  initialRouteName: 'initialRouteName',
  event: {
    ...constant.event,
    MinePageRightBtClicks: 'MinePageRightBtClicks',
  },
  isDarkTheme: 'isDarkTheme',
});
