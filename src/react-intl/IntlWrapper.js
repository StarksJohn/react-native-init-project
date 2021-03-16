import React, {useEffect, useState, useReducer} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect, useSelector} from 'react-redux';
import {IntlProvider} from 'react-intl';
import zh from './messages/zh.json';
import en from './messages/en.json';
// import {DEFAULT_LOCALE, DEFAULT_CURRENCY} from '@config/locale';
// import {IntlContextProvider} from '@wrappers/core/hooks';

export const IntlWrapper = ({children}) => {
  const intlModel = useSelector((state) => state.intlModel);
  console.log('IntlWrapper.js intlModel=', intlModel);

  const [locale, setLocale] = useState(intlModel.locale); //由 messages里的key 决定

  return (
    <IntlProvider
      // defaultLocale={DEFAULT_LOCALE}
      // formats={{
      //   number: {
      //     money: {
      //       currency: DEFAULT_CURRENCY,
      //       style: 'currency',
      //       currencyDisplay: 'symbol',
      //     },
      //   },
      // }}
      // initialNow={initialNow}
      locale={locale}
      messages={intlModel.messages}
      // textComponent={Text}
    >
      {children}
      {/*<IntlContextProvider>{children}</IntlContextProvider>*/}
    </IntlProvider>
  );
};

IntlWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // intl: PropTypes.shape({
  //   initialNow: PropTypes.number,
  //   locale: PropTypes.string,
  //   messages: PropTypes.object,
  // }).isRequired,
};

// export default IntlWrapper; //connect(({}) => ({}))(IntlProvider);
