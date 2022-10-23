import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { engine } from 'express-handlebars';

import routes from './routes';
import './app/config/database';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app);

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
