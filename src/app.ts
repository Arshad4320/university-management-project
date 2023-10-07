import express, { Application, Request, Response, NextFunction } from 'express';

import cors from 'cors';
import globalErrorHandler from './app/middlewars/globalErrorHandler';

import router from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

app.use(express.json());
//using for recieving all format data like objects and arrays
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

//not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'not found',
      errorMessage: {
        path: req.originalUrl,
        message: 'Api not found',
      },
    });
  } catch (error) {
    next(error);
  }
});

app.use(globalErrorHandler);
export default app;
