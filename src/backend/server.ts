import express, {
  Request,
  Response,
  NextFunction,
  Express,
  ErrorRequestHandler,
} from 'express';
import path from 'path'
import axios from 'axios'
const app : Express = express();
const PORT = 3000
;

// parse incoming JSON
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Testing Express Server');
});
// app.use(express.static(path.join(__dirname, '../frontend')));

// app.get('/', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });
app.get('/test',(req: Request, res: Response) => {
  res.send('Testing asdf Server'); 
})

app.post('/benchmark', async (req, res) => {
  const { requestType, url, requestBody, numRequests } = req.body;

  // Create an array of tasks
  const tasks = Array(numRequests).fill({
    requestType,
    url,
    requestBody,
  });

  try {
    // Execute the tasks
    const result = await Promise.all(
      tasks.map(async (task) => {
        const startTime = Date.now();
        try {
          // Make the request using axios
          const response = await axios.request({
            method: task.requestType,
            url: task.url,
            data: task.requestBody,
          });
          const executionTime = Date.now() -  startTime
          const byteSize = new TextEncoder().encode(JSON.stringify(response.data)).length
          return {
            message: "Request Success", executionTime, byteSize
          }
        } catch (error) {
          const executionTime = Date.now() - startTime
          return {
            message: 'Request Failed -------------------------------- ', executionTime,
            error: error.message
          }
        }
      })
    );
    
    const filteredSuccess = result.filter((el)=>{
      return el.message === 'Request Success'
    })
    const filteredErrors = result.filter((el) => {
      return el.message === 'Request Failed -------------------------------- ';
    });

    const successLength = filteredSuccess.length
    const errorLength = filteredErrors.length

    let passRate = (((successLength - errorLength) / (successLength + errorLength)) * 100).toFixed(2)
    passRate += '%'

    
    let successOverallTime = 0
    filteredSuccess.forEach(el=>{
      successOverallTime+= el.executionTime
    })
    const averageTime = (successOverallTime/successLength).toFixed(2)

    res.json({ message: 'Benchmarking complete', passRate, averageTime, successLength, errorLength, filteredSuccess, filteredErrors });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during benchmarking' });
  }
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
