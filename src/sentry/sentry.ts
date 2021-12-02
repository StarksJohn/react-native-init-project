/* istanbul ignore file
 * Should be imported in the index.js of the project
 *  */
import * as Sentry from '@sentry/react-native'
// import constant from '../constants/constant';
// @ts-ignore
import { constant } from '~constant'
// import Config from 'react-native-config';

const sentryLogList: string[] = []

// if (!__DEV__)
{
  Sentry.init({
    dsn: 'https://fad0a4194e4943769cc433647a495b16@o547966.ingest.sentry.io/5670897' // https://sentry.io/settings/cxa-um/projects/awesomeproject/keys/
    // environment: Config.ENVIRONMENT,
  })
}

export const captureError = (err: any) => {
  return Sentry.captureException(err)
}

/**
 * The message to send to Sentry. Can be viewed in the backstage Issues
 * @returns {string}
 */
export const captureMessage = () => {
  return Sentry.captureMessage(JSON.stringify(sentryLogList))
}

export const testJsCrash = () => {
  throw new Error('')
}

export const testNativeCrash = () => {
  Sentry.nativeCrash()
}

// @ts-ignore
export const captureEvent = ({ message, tags }) => {
  Sentry.captureEvent({ message, tags })
}

/**
 * Record the information to be capturedMessage
 * @param log
 */
export const sentryLog = (log:string) => {
  if (constant.sentryLog) {
    sentryLogList.push(log)
  }
}
