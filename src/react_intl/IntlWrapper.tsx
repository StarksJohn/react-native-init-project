// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
// import {DEFAULT_LOCALE, DEFAULT_CURRENCY} from '@config/locale';
import Messages from './messages/messages'
import { NavigationProp } from '@react-navigation/core'
import { StackHeaderProps } from '@react-navigation/stack'
import { RouteProps } from 'react-native-common-tools'
import { dvaState } from '~dva'

export interface Props {
  navigation:NavigationProp<any>,
  scene:StackHeaderProps['scene'], // Used for page components
  route:RouteProps,
  children?: ReactNode
}
export const IntlWrapper:React.FC<Props> = (Props) => {
  const { children } = Props

  const { locale } = useSelector((state:dvaState) => {
    return state.intlModel
  })
  console.log('IntlWrapper.js locale=', locale)

  // @ts-ignore
  const [messages, setMessages] = useState(Messages[locale])

  useEffect(() => {
    console.log('IntlWrapper.js useEffect locale changed to =', locale)
    // @ts-ignore
    setMessages(Messages[locale])
  }, [locale])

  useEffect(() => {
    console.log('IntlWrapper.js useEffect messages changed to =', messages)
  }, [messages])

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
      messages={messages}
      // textComponent={Text}
    >
      {children}
      {/* <IntlContextProvider>{children}</IntlContextProvider> */}
    </IntlProvider>
  )
}

// IntlWrapper.propTypes = {
//   children: PropTypes.node.isRequired
//   // intl: PropTypes.shape({
//   //   initialNow: PropTypes.number,
//   //   locale: PropTypes.string,
//   //   messages: PropTypes.object,
//   // }).isRequired,
// }

export default IntlWrapper
