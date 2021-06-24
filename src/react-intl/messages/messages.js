import en from './en.json';
import zh from './zh.json';
import * as locale from '../locale';

const messages = {
  [locale.EN]: {...en},
  [locale.CN]: {...zh},
};

export default messages;
