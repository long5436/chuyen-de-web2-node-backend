import { Request, Response, NextFunction } from 'express';
import { CountriesRepository } from '~/app/repositories';
import Utils from '~/app/utils';

class WebController {
  index(req: Request, res: Response, next: NextFunction) {
    res.render('index', {
      title: 'Admin home',
    });
  }

  login(req: Request, res: Response, next: NextFunction) {
    res.render('login', {
      layout: 'bodyOnly',
      style: 'auth',
      title: 'Admin login',
    });
  }

  async country(req: Request, res: Response, next: NextFunction) {
    const data: any = await CountriesRepository.getCountries();

    const resultData = await Utils.convertDataSequelize(data);
    // console.log(resultData);

    res.render('country', {
      style: 'country',
      title: 'Conuntries',
      countries: resultData.rows,
      countCountries: resultData.count,
    });
  }
}

export default new WebController();
