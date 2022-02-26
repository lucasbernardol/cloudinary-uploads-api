import express from 'express';
import helmet from 'helmet';

import cors from 'cors';
import morgan from 'morgan';

import { routes } from '@routes/v1';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(cors());

app.use(morgan('dev'));

app.use(routes);

export { app };
