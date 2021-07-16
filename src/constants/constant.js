import React from 'react';
import { constant } from '@RNProjectTools';

export default Object.freeze({
  fakeData: false, //! !__DEV__,
  ...constant,
  sentryLog: true,
  initialRouteName: 'initialRouteName',
  event: {
    MinePageRightBtClicks: 'MinePageRightBtClicks',
  },
});
