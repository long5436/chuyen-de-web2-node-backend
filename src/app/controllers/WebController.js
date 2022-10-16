class WebController {
  index(req, res, next) {
    res.render('index', {
      title: 'this is title',
    });
  }

  login(req, res, next) {
    res.render('login', {
      layout: 'bodyOnly',
      style: 'login',
      title: 'Admin login',
    });
  }
}

export default new WebController();
