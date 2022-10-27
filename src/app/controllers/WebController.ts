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
      style: 'login',
      title: 'Admin login',
    });
  }
}

export default new WebController();
