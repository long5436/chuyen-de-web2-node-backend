import axios, { Axios } from 'axios';
import moment from 'moment';

const baseURL: string = 'https://prod-public-api.livescore.com/v1/api';
// const token: string = process.env.API_TOKEN || '';

const format: string = 'YYYYMMDD'; //'DD/MM/YYYY';
const dateDefault = moment(new Date()).format(format);
// console.log({ date });

const instance: Axios = axios.create({
  baseURL,
  // timeout: 10000,
  // headers: {
  //   // 'X-Auth-Token': token,
  // },
});

class CrawlApi {
  async getMatches(matchDate?: string, slug?: string) {
    let data: any = {};
    if (slug) {
      // https://prod-public-api.livescore.com/v1/api/app/stage/soccer/vietnam/v-league-2/7?MD=1
      data = await axios.get(
        `https://prod-public-api.livescore.com/v1/api/app/stage/soccer/${slug}/7?MD=1`,
        {
          params: {
            MD: 1,
          },
        }
      );
    } else {
      data = await instance.get(`/app/date/soccer/${matchDate}/7`, {
        params: {
          MD: 1,
        },
      });
    }

    matchDate = matchDate ? matchDate : dateDefault;

    data.data.date = matchDate;

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

  async getMenu() {
    const baseURL: string = 'https://www.livescore.com/api/';
    try {
      const data = await axios.get(`${baseURL}/leftmenu/soccer`, {
        params: {
          MD: 1,
        },
      });
      return data.data;
    } catch (error) {
      return [];
    }
  }

  async getMenuItem(slug: string) {
    const baseURL: string = 'https://www.livescore.com/api/';
    try {
      const data = await axios.get(`${baseURL}/leftmenu/soccer/${slug}`, {
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
