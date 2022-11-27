import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { CountriesRepository, LeaguesRepository } from '~/app/repositories';
import { SportmonksApi, CrawlApi } from '~/app/services';
import Utils from '~/app/utils';

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

    if (data.hasOwnProperty('Stages')) {
      const resultData = data.Stages.map((e: any) => {
        return {
          leagueName: e.Snm,
          countryName: e.Cnm,
          image: Utils.handleImageDownload(
            e.Ccd + '.jpg',
            'https://static.livescore.com/i2/fh/' + e.Ccd + '.jpg'
          ),
          matches: e.Events.map((e1: any) => {
            return {
              leagueId: e1.Eid,
              time: e1.Esd,
              // type: e1.Media['12'][0].type ? e1.Media['12'][0].type : '',
              minute: e1.Eps,
              type: e1.Media,
              homeTeam: {
                name: e1.T1[0].Nm,
                image: Utils.handleImageDownload(
                  e1.T1[0].Img,
                  'https://lsm-static-prod.livescore.com/medium/' + e1.T1[0].Img
                ),
                win: e1.Tr1 ? e1.Tr1 : 0,
              },
              awayTeam: {
                name: e1.T2[0].Nm,
                image: Utils.handleImageDownload(
                  e1.T2[0].Img,
                  'https://lsm-static-prod.livescore.com/medium/' + e1.T2[0].Img
                ),
                win: e1.Tr2 ? e1.Tr2 : 0,
              },
            };
          }),
        };
      });

      res.send({ message: 'OK', data: resultData });
    } else {
      res.send({ message: 'ERROR', data: [] });
    }
  }

  async detail(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params?.id ? req.params?.id : '';

    const data = await CrawlApi.getDetail(id);
    if (data?.Eid) {
      const { H2H, T1, T2, Tr1, Tr2, Trh1, Trh2, Esd, Eps, LgT, Incs, Stg } = data;

      let arrIncs: any = [];

      if (Incs) {
        const IncCenter = {
          Min: 'HT',
          Sc: [Trh1 ? Trh1 : '', Trh2 ? Tr2 : ''],
        };

        const IncEnd = {
          Min: Eps,
          Sc: [Tr1, Tr2],
        };

        const Insc1 = Incs['1'] ? Incs['1'] : [];
        const Insc2 = Incs['2'] ? Incs['2'] : [];

        arrIncs = [...Insc1, IncCenter, ...Insc2, IncEnd];
      }

      const resultData = {
        id: data.Eid,
        matchName: Stg.Snm,
        leagueName: Stg.Cnm,
        image: Utils.handleImageDownload(
          Stg.Ccd + '.jpg',
          'https://lsm-static-prod.livescore.com/high/' + Stg.Ccd + '.jpg'
        ),
        detail: {
          time: Esd,
          minute: Eps,
          homeTeam: {
            name: T1[0].Nm,
            image: Utils.handleImageDownload(
              T1[0].Img,
              'https://lsm-static-prod.livescore.com/high/' + T1[0].Img
            ),
            win: Tr1,
          },
          awayTeam: {
            name: T2[0].Nm,
            image: Utils.handleImageDownload(
              T2[0].Img,
              'https://lsm-static-prod.livescore.com/high/' + T2[0].Img
            ),
            win: Tr2,
          },
        },
        headToHead: H2H?.map((h: any) => {
          const { Tr1, Tr2, T1, T2, Esd, Eps, Stg } = h;
          return {
            matchName: Stg.Snm,
            leagueName: Stg.Cnm,
            time: Esd,
            minute: Eps,
            homeTeam: {
              name: T1[0].Nm,
              image: Utils.handleImageDownload(
                T1[0].Img,
                'https://lsm-static-prod.livescore.com/medium/' + T1[0].Img
              ),
              win: Tr1,
            },
            awayTeam: {
              name: T2[0].Nm,
              image: Utils.handleImageDownload(
                T2[0].Img,
                'https://lsm-static-prod.livescore.com/medium/' + T2[0].Img
              ),
              win: Tr2,
            },
          };
        }),
        table: LgT?.map((lgt: any) => {
          lgt?.Tables?.map((t: any) => {
            const { team } = t;
            return {
              name: t.name,
              team: team.map((t1: any) => {
                const { rnk, Tnm, Img, pld, win, drw, lst, gf, ga, gd, pts } = t1;
                return {
                  ranking: rnk,
                  name: Tnm,
                  image: Utils.handleImageDownload(
                    Img,
                    'https://lsm-static-prod.livescore.com/medium/' + Img
                  ),
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
          });
        }),
        summary: arrIncs?.map((a: any) => {
          const { Min, Tnm, Img, Sc, Nm, MinEx } = a;
          return {
            minute: Min,
            minuteEx: MinEx,
            name: Tnm,
            // image: Img,
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

export default new ApiController();
