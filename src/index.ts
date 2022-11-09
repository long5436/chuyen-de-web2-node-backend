import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { engine } from 'express-handlebars';
import compression from 'compression';
import minifyHTML from 'express-minify-html-2';
import routes from './routes';
import './app/config/database';

// load config env
dotenv.config();

const PORT: number = !!process.env.PORT ? Number(process.env.PORT) : 3000;
const app: express.Application = express();

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

app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(minifyHTML(optionMinify));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app);

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
