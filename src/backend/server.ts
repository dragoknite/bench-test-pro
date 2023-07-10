import express, { Request, Response } from 'express';
const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Testing Hello, World Testing');
});

app.listen(PORT, () => {
  console.log(`Beep Boop server is running on port ${PORT}`);
});
