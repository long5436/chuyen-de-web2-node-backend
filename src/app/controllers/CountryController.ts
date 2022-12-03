import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { CountriesRepository, LeaguesRepository, MenuLeagueRepository } from '~/app/repositories';
import { CrawlApi } from '~/app/services';
import Utils from '~/app/utils';

let imageUrls: string[] = [];

class ApiController {
  async countries(req: Request, res: Response, next: NextFunction) {
    const dbData = await CountriesRepository.getAllCountries();

    if (dbData.rows.length > 0) {
      res.send(dbData.rows);
    } else {
      const resData = await CrawlApi.getMenu();
      imageUrls = [];

      let resultData: any = resData.map((item: any) => {
        return {
          name: item[1],
          image: Utils.getImageUrl(
            item[0] + '.jpg',
            'https://static.livescore.com/i2/fh/' + item[0] + '.jpg',
            imageUrls
          ),
          slug: item[0],
        };
      });

      resultData = resultData
        .map((e: any) => {
          if (Utils.checkIsCountry(e.slug)) return e;
        })
        .filter((e: any) => e);

      await Utils.saveAllFile(imageUrls);
      console.log('da xong');
      await CountriesRepository.addCountries(resultData);
      res.send(resultData);
    }
  }

  async getCountryData(req: Request, res: Response, next: NextFunction) {
    const slug: string = req.params?.slug ? req.params.slug : '';

    const dbData = await LeaguesRepository.getLeague(slug);

    if (dbData.rows.length > 0) {
      res.send(dbData.rows);
    } else {
      imageUrls = [];
      const resData = await CrawlApi.getMenuItem(slug);
      const resultData = resData.map((e: any) => {
        return {
          name: e[1],
          country_slug: e[3],
          slug: e[2]?.replace('/%s/', ''),
          image: Utils.getImageUrl(
            e[3] + '.jpg',
            'https://static.livescore.com/i2/fh/' + e[3] + '.jpg',
            imageUrls
          ),
        };
      });
      await LeaguesRepository.addLeagues(resultData);
      await Utils.saveAllFile(imageUrls);
      res.send(resultData);
    }
  }
}

export default new ApiController();
