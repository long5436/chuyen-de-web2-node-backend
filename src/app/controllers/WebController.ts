import { Request, Response, NextFunction } from 'express';
import {
  CountriesRepository,
  LeaguesRepository,
  PlayerRepository,
  SeasonRepository,
  TopscoreRepository,
} from '~/app/repositories';
import Utils from '~/app/utils';
import leaguesRepository from '../repositories/leaguesRepository';

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
      script: 'country',
      countries: resultData.data,
      currentPage: resultData.currentPage,
      totalPage: resultData.totalPage,
      pagination: pagination,
    });
  }

  async league(req: Request, res: Response, next: NextFunction) {
    const page: number = req.query?.page ? +req.query?.page : 1;
    const resp: any = await leaguesRepository.getLeagues(page);
    const resultData = await Utils.convertDataSequelize(resp);
    const pagination = await Utils.pagination(resultData.currentPage, resultData.totalPage);

    res.render('league', {
      style: 'country',
      title: 'Leagues',
      data: resultData.data,
      currentPage: resultData.currentPage,
      totalPage: resultData.totalPage,
      pagination: pagination,
    });
  }
  async season(req: Request, res: Response, next: NextFunction) {
    const page: number = req.query?.page ? +req.query?.page : 1;
    const resp: any = await SeasonRepository.getSeason(page);
    const resultData = await Utils.convertDataSequelize(resp);
    const pagination = await Utils.pagination(resultData.currentPage, resultData.totalPage);

    res.render('season', {
      style: 'season',
      title: 'Seasons',
      countries: resultData.data,
      currentPage: resultData.currentPage,
      totalPage: resultData.totalPage,
      pagination: pagination,
    });
  }
  async topscore(req: Request, res: Response, next: NextFunction) {
    const page: number = req.query?.page ? +req.query?.page : 1;
    const resp: any = await TopscoreRepository.getTopscore(page);
    const resultData = await Utils.convertDataSequelize(resp);
    const pagination = await Utils.pagination(resultData.currentPage, resultData.totalPage);

    res.render('topscore', {
      style: 'topscore',
      title: 'Topscore',
      countries: resultData.data,
      currentPage: resultData.currentPage,
      totalPage: resultData.totalPage,
      pagination: pagination,
    });
  }
  async player(req: Request, res: Response, next: NextFunction) {
    const page: number = req.query?.page ? +req.query?.page : 1;
    const resp: any = await PlayerRepository.getplayer(page);
    const resultData = await Utils.convertDataSequelize(resp);
    const pagination = await Utils.pagination(resultData.currentPage, resultData.totalPage);

    res.render('player', {
      style: 'player',
      title: 'Player',
      countries: resultData.data,
      currentPage: resultData.currentPage,
      totalPage: resultData.totalPage,
      pagination: pagination,
    });
  }
}

export default new WebController();
