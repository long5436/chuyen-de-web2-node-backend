import axios, { Axios } from 'axios';
import moment from 'moment';

const baseURL: string = 'https://prod-public-api.livescore.com/v1/api';
// const token: string = process.env.API_TOKEN || '';

const format: string = 'YYYYMMDD'; //'DD/MM/YYYY';
const date = moment(new Date()).format(format);
// console.log({ date });

const instance: Axios = axios.create({
  baseURL,
  // timeout: 10000,
  // headers: {
  //   // 'X-Auth-Token': token,
  // },
});

class CrawlApi {
  async getMatches() {
    const data = await instance.get(`/app/date/soccer/${date}/7`, {
      params: {
        MD: 1,
      },
    });

    return data.data;
  }

  async getDetail(id: string) {
    try {
      const data = await instance.get(`/app/match-x/soccer/${id}/7`, {
        params: {
          MD: 1,
        },
      });
      return data.data;
    } catch (error) {
      return [];
    }
  }
}

export default new CrawlApi();
