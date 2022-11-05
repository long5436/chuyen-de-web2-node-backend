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

    const data: Array<Object> = await FootballApi.getClubs();

    res.send({ data });
    // CountriesRepository.addCountries(data);

    // res.send('OK');
  }

  // async test(req: Request, res: Response, next: NextFunction) {
  //   const data = await Country.findAndCountAll({
  //     offset: 10,
  //     limit: 5,
  //   });

  //   res.send({ data });
  // }

  // async test2(req: Request, res: Response, next: NextFunction) {
  //   const url = 'https://prod-public-api.livescore.com/v1/api/app/date/soccer/20221026/7?MD=1';
  //   const data = await axios.get(url);

  //   const result = data.data.Stages.map((item) => {
  //     return {
  //       groupStage: item.Snm,
  //       company: item.CompN,
  //       Events: {
  //         startData: item.Events[0].Esd,
  //         club1: item.Events[0].T1,
  //         club2: item.Events[0].T2,
  //       },
  //     };
  //   });

  //   res.json({ data: result });
  // }
}

export default new ApiController();
