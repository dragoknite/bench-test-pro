import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
const app = express();
const PORT = 3000;

// parse incoming JSON
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Testing Hello, World Testing');
});

// global error middleware
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  err instanceof Error ? err.message : String(err);

  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign({}, defaultError, err);

  const statusNum: number = errObj.status || 500;

  res.status(statusNum).json({ error: err.message });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Beep Boop server is running on port ${PORT}, http://localhost:3000/`);
});
