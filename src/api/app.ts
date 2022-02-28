import express from 'express';
import helmet from 'helmet';

import cors from 'cors';
import morgan from 'morgan';

import { createHandler } from '@middlewares/HandlerMiddleware';
import { routes } from '@routes/v1';

import env from '@config/env';

const app = express();
const handle = createHandler();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());

/** Development */
if (env.IS_NODE_ENV_DEVELOPMENT) app.use(morgan('dev'));

app.use(routes);

/** Handlers  */
app.use(handle.notFound());
app.use(handle.multerError());
app.use(handle.http());

export { app };
