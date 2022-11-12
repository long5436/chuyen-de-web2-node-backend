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
      // const res: AxiosResponse = await instance.get('/areas');
      // const res: AxiosResponse = await instance.get('/areas');
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
}

export default new SportmonksApi();
