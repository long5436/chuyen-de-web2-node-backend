import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { MenuLeagueRepository } from '~/app/repositories';
import { CrawlApi } from '~/app/services';
import Utils from '~/app/utils';

let imageUrls: string[] = [];

class ApiController {
  async leagues(req: Request, res: Response, next: NextFunction) {
    const dbData = await MenuLeagueRepository.getAllMenuLeague();
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
          if (!Utils.checkIsCountry(e.slug)) return e;
        })
        .filter((e: any) => e);
      await Utils.saveAllFile(imageUrls);
      console.log('da xong');
      await MenuLeagueRepository.addMenuLeague(resultData);
      res.send(resultData);
    }
  }
}

export default new ApiController();
