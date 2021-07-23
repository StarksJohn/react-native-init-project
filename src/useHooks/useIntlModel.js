import React, { useEffect, useCallback, forwardRef, useImperativeHandle, useRef, memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { action as intlModel_action, effects as intlModel_effects } from './intlModel';
import intlModel from '../react_intl/intlModel.js';
import { CN, EN } from '../react_intl/locale';

export default () => {
  // const {locale, messages} = useSelector((state) => state.intlModel);
  const dispatch = useDispatch();

  const switchToCN = useCallback(
    (payload) => {
      console.log('useIntlModel switchToCN payload=', payload);
      return dispatch({
        type: intlModel.effects.saveSomeThing,
        action: intlModel.action.locale,
        payload: { locale: CN },
        callback: (result) => {
          console.log('useIntlModel.js 切换为中文 locale callback=', result);
        },
      });
    },
    [dispatch]
  );

  const switchToEN = useCallback(
    (payload) => {
      console.log('useIntlModel switchToEN payload=', payload);
      return dispatch({
        type: intlModel.effects.saveSomeThing,
        action: intlModel.action.locale,
        payload: { locale: EN },
        callback: (result) => {
          console.log('useIntlModel.js 切换为EN callback=', result);
        },
      });
    },
    [dispatch]
  );

  return { switchToCN, switchToEN };
};
