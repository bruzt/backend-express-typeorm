import dotenv from 'dotenv';

let env: string;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////////

import express from 'express';
import { errors } from 'celebrate';

import './database/connection';
import router from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use(errors());

export default app;
