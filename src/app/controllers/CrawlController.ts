import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
// import { CountriesRepository, LeaguesRepository } from '~/app/repositories';
import CrawlApi from '~/app/services/crawl';

class CrawlController {
  async matches(req: Request, res: Response, next: NextFunction) {
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

    res.send(data);
  }
}
export default new CrawlController();
