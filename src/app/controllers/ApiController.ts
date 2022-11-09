import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { CountriesRepository } from '~/app/repositories';
import { FootballApi } from '~/app/services';

import '../services';

class ApiController {
  async index(req: Request, res: Response, next: NextFunction) {
    // const url = 'https://www.livescore.com/api/leftmenu/soccer';

    // try {
    //   const resp = await axios(url);

    //   CountriesRepository.addCountries(resp.data);
    // } catch (error) {
    //   res.send(error);
    // }

    const data: Array<Object> = await FootballApi.getCountries();

    // res.send({ data });
    CountriesRepository.addCountries(data);

    res.send('OK');
  }
}

export default new ApiController();
