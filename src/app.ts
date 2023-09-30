import express, { Application } from 'express';

import cors from 'cors';
import globalErrorHandler from './app/middlewars/globalErrorHandler';

import router from './app/routes';

const app: Application = express();

app.use(cors());

app.use(express.json());
//using for recieving all format data like objects and arrays
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

app.use(globalErrorHandler);
export default app;
