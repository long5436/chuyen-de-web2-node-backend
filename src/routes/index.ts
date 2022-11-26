import express from 'express';
import { web, api, crawl } from './modules';

const routes: Function = (app: express.Application) => {
  app.use('/crawl', crawl);
  app.use('/api', api);
  app.use('', web);
};

export default routes;
