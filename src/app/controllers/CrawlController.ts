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

  async detail(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params?.id ? req.params?.id : '';

    const data = await CrawlApi.getDetail(id);
    if (data?.Eid) {
      const { H2H, T1, T2, Tr1, Tr2, Trh1, Trh2, Esd, Eps, LgT, Incs } = data;

      const IncCenter = {
        Min: 'HT',
        Sc: [Trh1, Trh2],
      };

      const IncEnd = {
        Min: Eps,
        Sc: [Tr1, Tr2],
      };

      const arrIncs = [...Incs['1'], IncCenter, ...Incs['2'], IncEnd];

      const resultData = {
        id: data.Eid,
        detail: {
          time: Esd,
          minute: Eps,
          homeTeam: {
            name: T1[0].Nm,
            image: T1[0].Img,
            win: Tr1,
          },
          awayTeam: {
            name: T2[0].Nm,
            image: T2[0].Img,
            win: Tr2,
          },
        },
        headToHead: H2H.map((h: any) => {
          const { Tr1, Tr2, T1, T2, Esd, Eps } = h;
          return {
            time: Esd,
            minute: Eps,
            homeTeam: {
              name: T1[0].Nm,
              image: T1[0].Img,
              win: Tr1,
            },
            awayTeam: {
              name: T2[0].Nm,
              image: T2[0].Img,
              win: Tr2,
            },
          };
        }),
        table: LgT[0].Tables.map((t: any) => {
          const { team } = t;

          return {
            name: t.name,
            team: team.map((t1: any) => {
              const { rnk, Tnm, Img, pld, win, drw, lst, gf, ga, gd, pts } = t1;

              return {
                ranking: rnk,
                name: Tnm,
                image: Img,
                player: pld,
                win: win,
                draw: drw,
                losses: lst,
                goalsFor: gf,
                goalsAgainst: ga,
                goalsDifference: gd,
                points: pts,
              };
            }),
          };
        }),
        summary: arrIncs.map((a: any) => {
          const { Min, Tnm, Img, Sc, Nm, MinEx } = a;

          return {
            minute: Min,
            minuteEx: MinEx,
            name: Tnm,
            image: Img,
            score: Sc,
            nowValue: Nm,
          };
        }),
      };
      res.send({ message: 'OK', data: resultData });
    } else {
      res.send({ message: 'ERROR', data: [] });
    }
  }
}
export default new CrawlController();
