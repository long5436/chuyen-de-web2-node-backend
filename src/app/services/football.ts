import { AxiosResponse } from 'axios';
import instance from './instance';

// test fail
// async function response(callback: Function) {
//   try {
//     return callback();
//   } catch (error) {
//     return [];
//   }
// }

class FootballApi {
  async getCountries() {
    try {
      const res: AxiosResponse = await instance.get('/areas');
      return res.data.areas;
      return [];
    } catch (error) {
      return [];
    }
  }

  async getClubs() {
    try {
      const res: AxiosResponse = await instance.get('/teams');
      return res.data;
      return [];
    } catch (error) {
      return [];
    }
  }
}

export default new FootballApi();
