import constant from './constant';

/**
 * import { constant } from '@/constant';
 * note: Other files in the current directory cannot import {} from'@/constant',Will be undefined due to repeated references
 */
module.exports = {
  constant,
};
