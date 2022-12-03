import axios, { AxiosResponse } from 'axios';
import instance from './instance';
import dotenv from 'dotenv';
dotenv.config();

type Params = {
  api_token: string;
  page?: number;
};

const params = {
  api_token: process.env.API_TOKEN,
};

class SportmonksApi {
  async getCountries(page?: number) {
    try {
      const res: AxiosResponse = await instance.get('/countries', {
        params: { ...params, page: page ? page : 1 },
      });
      // return res.data.areas;
      return res.data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  async getLeagues(page?: number) {
    try {
      const res: AxiosResponse = await instance.get('/leagues', {
        params: { ...params, page: page ? page : 1 },
      });
      // return res.data.areas;
      return res.data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  async getTopscore(season: string, page?: number) {
    try {
      const res: AxiosResponse = await instance.get('/topscorers/season/' + season, {
        params: { ...params, page: page ? page : 1 },
      });
      // return res.data.areas;

      return res.data.data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  async getPlayer(id: string) {
    try {
      const res: AxiosResponse = await instance.get('/players/' + id, {
        params: { ...params },
      });
      // return res.data.areas;

      return res.data.data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
  async getTeam(id: number) {
    try {
      const res: AxiosResponse = await instance.get('/teams/' + id, {
        params: { ...params },
      });
      // return res.data.areas;

      return res.data.data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
}

export default new SportmonksApi();
