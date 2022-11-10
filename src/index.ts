import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { engine } from 'express-handlebars';
import middleware from './app/middlewares';
import routes from './routes';
import * as db from './app/config/database';

// load config env
dotenv.config();
db.connect();

const PORT: number = !!process.env.PORT ? Number(process.env.PORT) : 3000;
const app: express.Application = express();

middleware(app);

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app);

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
