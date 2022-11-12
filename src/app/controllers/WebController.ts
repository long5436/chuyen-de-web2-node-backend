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
    const page: number = req.query?.page ? +req.query?.page : 1;
    const resp: any = await CountriesRepository.getCountries(page);
    const resultData = await Utils.convertDataSequelize(resp);
    const pagination = await Utils.pagination(resultData.currentPage, resultData.totalPage);

    res.render('country', {
      style: 'country',
      title: 'Conuntries',
      countries: resultData.data,
      currentPage: resultData.currentPage,
      totalPage: resultData.totalPage,
      pagination: pagination,
    });
  }
}

export default new WebController();
