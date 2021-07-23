import SafeView from './SafeView';
console.log('src/components/index.js SafeView=', SafeView);

/**
 * import { SafeView } from '@components';
 * note: Other files in the current directory cannot import {} from'@components',Will be undefined due to repeated references
 */
module.exports = {
  SafeView,
};
