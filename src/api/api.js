import { XHttp } from '@RNProjectTools';
import Urls from './Urls';

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
        .get((success, { results, last_page }, msg, code) => {
          console.log('api.js anime results=', results);
          if (success) {
            resolve(results);
          } else {
            reject();
          }
        });
    });
  },

  async campaign_banner(payload) {
    console.log('api.js campaign_banner payload=', payload);
    payload = {
      ...{
        campaign_type: payload?.campaign_type || 'weight', //weight, step
      },
      ...payload,
    };
    return new Promise((resolve, reject) => {
      XHttp()
        .url(Urls.campaign_banner)
        .param(payload)
        .get(({ success, json, message, status, response }) => {
          console.log(
            'api.js campaign_banner success=',
            success,
            ' json=',
            json,
            ' message=',
            message,
            ' status=',
            status
          );
          if (success) {
            resolve(json);
          } else {
            reject([]);
          }
        });
    });
    // const [err, data] = await tool.to(
    //   request(Urls.campaign_banner, {
    //     method: 'GET',
    //     body: {
    //       campaign_type: payload?.campaign_type || 'weight', //weight, step
    //     },
    //   }),
    // );
    /**
     * data:[
     *  {
     *    homepage_banner: "https://hsbc-wsmp-static.cxaone.cn/banner1.png",
                id: 0,
                url: "",
                route_name:'packageA/pages/HealthyWalkDetailPage/HealthyWalkDetailPage'
     *  },
     *  {
     *    homepage_banner: "https://hsbc-wsmp-static.cxaone.cn/banner2.png",
                id: 0,
                url: "",
                route_name:''
     *  }
     * ]
     */
    // if (data) {
    //   return Promise.resolve(data);
    // } else {
    //   return Promise.reject(null);
    // }
  },
};
