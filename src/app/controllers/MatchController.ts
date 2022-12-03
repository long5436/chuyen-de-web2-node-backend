import { Request, Response, NextFunction } from 'express';
import { CrawlApi } from '~/app/services';
import Utils from '~/app/utils';

let imageUrls: string[] = [];

class MatchController {
  async matches(req: Request, res: Response, next: NextFunction) {
    const date: string = req.params?.date ? req.params.date : '';

    const data = await CrawlApi.getMatches(date);
    imageUrls = [];

    if (data.hasOwnProperty('Stages')) {
      const resultData = data.Stages.map((e: any) => {
        return {
          leagueName: e.Snm,
          countryName: e.Cnm,
          image: Utils.getImageUrl(
            e.Ccd + '.jpg',
            'https://static.livescore.com/i2/fh/' + e.Ccd + '.jpg',
            imageUrls
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
                image: Utils.getImageUrl(
                  e1.T1[0].Img,
                  'https://lsm-static-prod.livescore.com/medium/' + e1.T1[0].Img,
                  imageUrls
                ),
                win: e1.Tr1 ? e1.Tr1 : 0,
              },
              awayTeam: {
                name: e1.T2[0].Nm,
                image: Utils.getImageUrl(
                  e1.T2[0].Img,
                  'https://lsm-static-prod.livescore.com/medium/' + e1.T2[0].Img,
                  imageUrls
                ),
                win: e1.Tr2 ? e1.Tr2 : 0,
              },
            };
          }),
        };
      });

      // console.log(imageUrls);

      await Utils.saveAllFile(imageUrls);
      console.log('da xong');

      res.send({ message: 'OK', date: data.date, data: resultData });
    } else {
      res.send({ message: 'ERROR', data: [] });
    }
  }

  async matchesFromMenu(req: Request, res: Response, next: NextFunction) {
    const name: string = req.params?.name ? req.params.name : '';
    const slug: string = req.params?.slug ? req.params.slug : '';

    const data = await CrawlApi.getMatches('', `${name}/${slug}`);
    // imageUrls = [];

    if (data?.hasOwnProperty('Stages')) {
      const resultData = data.Stages.map((e: any) => {
        return {
          leagueName: e.Snm,
          countryName: e.Cnm,
          image: Utils.getImageUrl(
            e.Ccd + '.jpg',
            'https://static.livescore.com/i2/fh/' + e.Ccd + '.jpg',
            imageUrls
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
                image: Utils.getImageUrl(
                  e1.T1[0].Img,
                  'https://lsm-static-prod.livescore.com/medium/' + e1.T1[0].Img,
                  imageUrls
                ),
                win: e1.Tr1 ? e1.Tr1 : 0,
              },
              awayTeam: {
                name: e1.T2[0].Nm,
                image: Utils.getImageUrl(
                  e1.T2[0].Img,
                  'https://lsm-static-prod.livescore.com/medium/' + e1.T2[0].Img,
                  imageUrls
                ),
                win: e1.Tr2 ? e1.Tr2 : 0,
              },
            };
          }),
        };
      });

      // console.log(imageUrls);

      await Utils.saveAllFile(imageUrls);
      console.log('da xong');

      res.send({ message: 'OK', date: data.date, data: resultData });
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
        image: Utils.getImageUrl(
          Stg.Ccd + '.jpg',
          'https://lsm-static-prod.livescore.com/high/' + Stg.Ccd + '.jpg',
          imageUrls
        ),
        detail: {
          time: Esd,
          minute: Eps,
          homeTeam: {
            name: T1[0].Nm,
            image: Utils.getImageUrl(
              T1[0].Img,
              'https://lsm-static-prod.livescore.com/high/' + T1[0].Img,
              imageUrls
            ),
            win: Tr1,
          },
          awayTeam: {
            name: T2[0].Nm,
            image: Utils.getImageUrl(
              T2[0].Img,
              'https://lsm-static-prod.livescore.com/high/' + T2[0].Img,
              imageUrls
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
            image: Utils.getImageUrl(
              Stg.Ccd + '.jpg',
              'https://static.livescore.com/i2/fh/' + Stg.Ccd + '.jpg',
              imageUrls
            ),
            homeTeam: {
              name: T1[0].Nm,
              image: Utils.getImageUrl(
                T1[0].Img,
                'https://lsm-static-prod.livescore.com/medium/' + T1[0].Img,
                imageUrls
              ),
              win: Tr1,
            },
            awayTeam: {
              name: T2[0].Nm,
              image: Utils.getImageUrl(
                T2[0].Img,
                'https://lsm-static-prod.livescore.com/medium/' + T2[0].Img,
                imageUrls
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
                image: Utils.getImageUrl(
                  Img,
                  'https://lsm-static-prod.livescore.com/medium/' + Img,
                  imageUrls
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
      await Utils.saveAllFile(imageUrls);
      console.log('da xong');
      res.send({ message: 'OK', data: resultData });
    } else {
      res.send({ message: 'ERROR', data: [] });
    }
  }
}

export default new MatchController();
