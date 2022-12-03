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
  async getSeason() {
    try {
      const res: AxiosResponse = await instance.get('/seasons', {
        params: { ...params },
      });
      // return res.data.areas;

      return res.data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
  async getTopscore(page?: number) {
    try {
      const res: AxiosResponse = await instance.get('/topscorers/season/17141', {
        params: { ...params, page: page ? page : 1 },
      });
      // return res.data.areas;

      return res.data.data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
  async getPlayer(page?: number) {
    try {
      const res: AxiosResponse = await instance.get('/players', {
        params: { ...params, page: page ? page : 1 },
      });
      // return res.data.areas;

      return res.data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
}

export default new SportmonksApi();
