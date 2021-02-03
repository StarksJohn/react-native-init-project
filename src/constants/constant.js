import React from 'react';
import {constant} from 'RNProjectTools';

export default Object.freeze({
  fakeData: true, //! !__DEV__,
  ...constant,
  initialRouteName: 'initialRouteName',
  event: {
    MinePageRightBtClicks: 'MinePageRightBtClicks',
  },
});
