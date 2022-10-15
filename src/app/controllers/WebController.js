class WebController {
  index(req, res, next) {
    res.render('index', {
      title: 'this is title',
    });
  }
}

export default new WebController();
