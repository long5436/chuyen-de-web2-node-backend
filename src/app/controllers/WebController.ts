import { Request, Response, NextFunction } from 'express';

class WebController {
  index(req: Request, res: Response, next: NextFunction) {
    res.render('index', {
      title: 'this is title',
    });
  }

  login(req: Request, res: Response, next: NextFunction) {
    res.render('login', {
      layout: 'bodyOnly',
      style: 'auth',
      title: 'Admin login',
    });
  }

  country(req: Request, res: Response, next: NextFunction) {
    res.render('country', {
      title: 'Conuntries',
    });
  }
}

export default new WebController();
