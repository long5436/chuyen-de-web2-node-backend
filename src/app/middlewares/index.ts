import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import minifyHTML from 'express-minify-html-2';

const optionMinify: Object = {
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

const middleware: Function = (app: express.Application) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(minifyHTML(optionMinify));
  app.use(compression());
};

export default middleware;
