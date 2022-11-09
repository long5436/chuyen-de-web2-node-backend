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
    } catch (error) {
      return [];
    }
  }

  async getClubs() {
    try {
      const res: AxiosResponse = await instance.get('/teams');
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async getMatches() {
    try {
      const res: AxiosResponse = await instance.get('/matches');
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async getMatchesChampionsLeague() {
    try {
      const res: AxiosResponse = await instance.get('/competitions/CL/matches');
      return res.data;
    } catch (error) {
      return [];
    }
  }
}

export default new FootballApi();
