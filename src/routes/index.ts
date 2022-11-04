import express from 'express';
import { web, api } from './modules';

const routes = (app: express.Application) => {
  app.use('/api', api);
  app.use('', web);
};

export default routes;
