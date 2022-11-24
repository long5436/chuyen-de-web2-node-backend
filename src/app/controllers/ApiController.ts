import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { CountriesRepository, LeaguesRepository } from '~/app/repositories';
import { SportmonksApi, FootballApi, CrawlApi } from '~/app/services';

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

  async matchToday(req: Request, res: Response, next: NextFunction) {
    const data = await CrawlApi.getMatches();

    const resultData = data.Stages.map((e: any) => {
      return {
        leagueName: e.Snm,
        countryName: e.Cnm,
        image: e.Ccd,
        matches: e.Events.map((e1: any) => {
          return {
            leagueId: e1.Eid,
            time: e1.Esd,
            // type: e1.Media['12'][0].type ? e1.Media['12'][0].type : '',
            minute: e1.Eps,
            type: e1.Media,
            homeTeam: {
              name: e1.T1[0].Nm,
              image: e1.T1[0].Img,
              win: e1.Tr1 ? e1.Tr1 : 0,
            },
            awayTeam: {
              name: e1.T2[0].Nm,
              image: e1.T2[0].Img,
              win: e1.Tr2 ? e1.Tr2 : 0,
            },
          };
        }),
      };
    });

    res.send(resultData);
  }
}

export default new ApiController();
