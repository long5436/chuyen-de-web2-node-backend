import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { CountriesRepository, LeaguesRepository } from '~/app/repositories';
import { SportmonksApi, FootballApi } from '~/app/services';

class ApiController {
  async countries(req: Request, res: Response, next: NextFunction) {
    const data: any = await SportmonksApi.getCountries();

    // res.send({ data });
    await CountriesRepository.addCountries(data.data);

    const totalPage = data.meta.pagination.total_pages;

    if (totalPage > 1) {
      for (let i = 2; i <= totalPage; i++) {
        const data: any = await SportmonksApi.getCountries(i);

        // res.send({ data });
        await CountriesRepository.addCountries(data.data);
      }
    }

    // console.log(data.data.map((e) => e.image_path));

    res.send('OK');
  }

  async getAllCountries(req: Request, res: Response, next: NextFunction) {
    const data = await CountriesRepository.getAllCountries();
    res.send(data);
  }

  async leagues(req: Request, res: Response, next: NextFunction) {
    const data = await SportmonksApi.getLeagues();

    await LeaguesRepository.addLeagues(data.data);
    // res.send({ data });

    const totalPage = data.meta.pagination.total_pages;

    if (totalPage > 1) {
      for (let i = 2; i <= totalPage; i++) {
        const data: any = await SportmonksApi.getLeagues(i);

        res.send({ data });

        await LeaguesRepository.addLeagues(data.data);
      }
    }

    res.send('OK');
  }
}

export default new ApiController();
