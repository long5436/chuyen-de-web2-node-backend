import { web, api } from './modules';

const routes = (app) => {
  app.use('/api', api);
  app.use('', web);
};

export default routes;
