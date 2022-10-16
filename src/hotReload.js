import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

function hostReload(app) {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 10);
  });

  app.use(connectLivereload());
}

export default hostReload;
