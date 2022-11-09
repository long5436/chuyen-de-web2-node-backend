import express from 'express';
import cors from 'cors';
import compression from 'compression';
import minifyHTML from 'express-minify-html-2';

const optionMinify = {
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true,
    minifyCSS: true,
  },
};

const middleware = (app: express.Application) => {
  app.use(cors());
  app.use(compression());
  app.use(minifyHTML(optionMinify));
};

export default middleware;
