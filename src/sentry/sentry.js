/* istanbul ignore file
 * Should be imported in the index.js of the project
 *  */
import * as Sentry from '@sentry/react-native';
import constant from '../constants/constant';
// import Config from 'react-native-config';

const sentryLogList = [];

// if (!__DEV__)
{
  Sentry.init({
    dsn:
      'https://fad0a4194e4943769cc433647a495b16@o547966.ingest.sentry.io/5670897', //https://sentry.io/settings/cxa-um/projects/awesomeproject/keys/
    // environment: Config.ENVIRONMENT,
  });
}

export const captureError = (err) => {
  return Sentry.captureException(err);
};

export const captureMessage = (msg) => {
  return Sentry.captureMessage(msg);
};

/**
 * Simulate RN's error report, you can seen in BREADCRUMBS in the background
 */
export const testJsCrash = () => {
  throw new Error(JSON.stringify(sentryLogList));
};

export const testNativeCrash = () => {
  Sentry.nativeCrash();
};

export const captureEvent = ({message, tags}) => {
  Sentry.captureEvent({message, tags});
};

/**
 * Log that can be seen in BREADCRUMBS in the background
 * @param log
 */
export const sentryLog = (log: string) => {
  if (constant.sentryLog) {
    sentryLogList.push(log);
  }
};
