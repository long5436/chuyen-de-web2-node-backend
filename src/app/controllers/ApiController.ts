import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import { CountriesRepository, LeaguesRepository } from '~/app/repositories';
import { SportmonksApi, CrawlApi } from '~/app/services';
import Utils from '~/app/utils';
import utils from '~/app/utils';

let imageUrls: string[] = [];
dotenv.config();
const serverUrl: string = process.env.SERVER_URL || '';
const errName: string[] = ['undefined.jpg', 'undefined.png', 'undefined'];

function getImageUrl(fileName: string, url: string): string {
  // kiem tra neu hinh anh khong co hoac bi loi thi bo qua cai nay
  if (errName.includes(fileName)) return '';

  const splitFileName: string[] = fileName?.split('/');
  let result: string = '';
  let resultFileName: string = '';
  if (splitFileName) {
    resultFileName = splitFileName.length > 1 ? splitFileName[1] : splitFileName[0];
    result = `${serverUrl}/assets/other-image/${resultFileName}`;
    if (!Utils.checkFileExit(resultFileName)) {
      imageUrls.push(url);
    }
  }

  return result;
}

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
    imageUrls = [];

    if (data.hasOwnProperty('Stages')) {
      const resultData = data.Stages.map((e: any) => {
        return {
          leagueName: e.Snm,
          countryName: e.Cnm,
          image: getImageUrl(
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
                image: getImageUrl(
                  e1.T1[0].Img,
                  'https://lsm-static-prod.livescore.com/medium/' + e1.T1[0].Img
                ),
                win: e1.Tr1 ? e1.Tr1 : 0,
              },
              awayTeam: {
                name: e1.T2[0].Nm,
                image: getImageUrl(
                  e1.T2[0].Img,
                  'https://lsm-static-prod.livescore.com/medium/' + e1.T2[0].Img
                ),
                win: e1.Tr2 ? e1.Tr2 : 0,
              },
            };
          }),
        };
      });

      // console.log(imageUrls);

      await utils.saveAllFile(imageUrls);
      console.log('da xong');

      res.send({ message: 'OK', data: resultData });
    } else {
      res.send({ message: 'ERROR', data: [] });
    }
  }

  async detail(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params?.id ? req.params?.id : '';
    imageUrls = [];

    const data = await CrawlApi.getDetail(id);
    if (data?.Eid) {
      const { H2H, T1, T2, Tr1, Tr2, Trh1, Trh2, Esd, Eps, LgT, Incs, Stg } = data;

      let arrIncs: any = [];

      if (Incs) {
        const IncCenter = {
          Min: 'HT',
          Sc: [Trh1 ? Trh1 : '', Trh2 ? Trh2 : ''],
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
        image: getImageUrl(
          Stg.Ccd + '.jpg',
          'https://lsm-static-prod.livescore.com/high/' + Stg.Ccd + '.jpg'
        ),
        detail: {
          time: Esd,
          minute: Eps,
          homeTeam: {
            name: T1[0].Nm,
            image: getImageUrl(
              T1[0].Img,
              'https://lsm-static-prod.livescore.com/high/' + T1[0].Img
            ),
            win: Tr1,
          },
          awayTeam: {
            name: T2[0].Nm,
            image: getImageUrl(
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
            image: getImageUrl(
              Stg.Ccd + '.jpg',
              'https://static.livescore.com/i2/fh/' + Stg.Ccd + '.jpg'
            ),
            homeTeam: {
              name: T1[0].Nm,
              image: getImageUrl(
                T1[0].Img,
                'https://lsm-static-prod.livescore.com/medium/' + T1[0].Img
              ),
              win: Tr1,
            },
            awayTeam: {
              name: T2[0].Nm,
              image: getImageUrl(
                T2[0].Img,
                'https://lsm-static-prod.livescore.com/medium/' + T2[0].Img
              ),
              win: Tr2,
            },
          };
        }),
        table: LgT?.map((lgt: any) => {
          return lgt.Tables?.map((t: any) => {
            const { team } = t;

            return team.map((t1: any) => {
              const { rnk, Tnm, Img, pld, win, drw, lst, gf, ga, gd, pts } = t1;
              return {
                ranking: rnk,
                name: Tnm,
                image: getImageUrl(Img, 'https://lsm-static-prod.livescore.com/medium/' + Img),
                player: pld,
                win: win,
                draw: drw,
                losses: lst,
                goalsFor: gf,
                goalsAgainst: ga,
                goalsDifference: gd,
                points: pts,
              };
            });
          });
        }),
        summary: arrIncs?.map((a: any) => {
          const { Min, Tnm, Img, Sc, Nm, MinEx, Pn, Incs } = a;
          // console.log({ a });

          return {
            minute: Min,
            minuteEx: MinEx,
            name: Tnm,
            // image: Img,
            score: Sc,
            nowValue: Nm,
            player: Pn,
            players: Incs
              ? {
                  player1: Incs[0].Pn,
                  player2: Incs[1].Pn,
                }
              : null,
          };
        }),
      };
      await utils.saveAllFile(imageUrls);
      console.log('da xong');
      res.send({ message: 'OK', data: resultData });
    } else {
      res.send({ message: 'ERROR', data: [] });
    }
  }
  async season(req: Request, res: Response, next: NextFunction) {
    const data: any = await SportmonksApi.getSeason();
    res.send(data);
    // res.send('oo');
  }
  async topscore(req: Request, res: Response, next: NextFunction) {
    const data: any = await SportmonksApi.getTopscore();
    const goalscorers = {};

    // res.send('oo');
  }
  async player(req: Request, res: Response, next: NextFunction) {
    const data: any = await SportmonksApi.getPlayer();

    //res.send(data);
    res.send('oo');
  }
}

export default new ApiController();
