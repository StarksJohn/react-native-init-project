import {XHttp} from 'RNProjectTools';

export default {
  anime: async (p = {}) => {
    p = {
      ...{
        page: 1,
      },
      ...p,
    };
    return new Promise((resolve, reject) => {
      XHttp()
        .url('https://api.jikan.moe/v3/search/anime?q=Fate/Zero')
        .param(p)
        .get((success, {results, last_page}, msg, code) => {
          console.log('api.js anime results=', results);
          if (success) {
            resolve(results);
          } else {
            reject();
          }
        });
    });
  },
};
