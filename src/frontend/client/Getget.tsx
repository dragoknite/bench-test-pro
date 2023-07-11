import React, { useState } from 'react';

function Ayooo() {
  const [apiUrl, setApiUrl] = useState('');
  const [sampleCount, setSampleCount] = useState(1);
  const [sendBytes, setSendBytes] = useState([]);
  const [connectTimes, setConnectTimes] = useState([]);

  const getDataFromAPI = () => {
    if (apiUrl === '') {
      alert('Please enter the API URL.');
      return;
    }

    if (isNaN(sampleCount) || sampleCount <= 0) {
      alert('Please enter a valid sample count greater than zero.');
      return;
    }

    const fetchData = () => {
      const connectStartTime = performance.now(); // Start measuring the connect time

      return fetch(apiUrl, { method: 'GET' })
        .then((response) => {
          // Stop measuring the connect time
          const connectEndTime = performance.now();

          // Calculate the connect time in milliseconds
          const connectTime = connectEndTime - connectStartTime;
          setConnectTimes((prevTimes) => [...prevTimes, connectTime.toFixed(2)]);

          return response.blob().then((blob) => {
            setSendBytes((prevBytes) => [...prevBytes, blob.size]);

            // Use the retrieved data and header values as needed
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const fetchDataPromises = [];

    for (let i = 0; i < sampleCount; i++) {
      fetchDataPromises.push(fetchData());
    }

    Promise.all(fetchDataPromises)
      .then(() => {
        console.log('All samples completed.');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>REST API Request Example</h1>
      <label htmlFor="api-url">API URL:</label>
      <input
        type="text"
        id="api-url"
        name="api-url"
        placeholder="Enter API endpoint URL"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
      />
      <br />
      <label htmlFor="sample-count">Sample Count:</label>
      <input
        type="number"
        id="sample-count"
        name="sample-count"
        min="1"
        value={sampleCount}
        onChange={(e) => setSampleCount(parseInt(e.target.value))}
      />
      <button id="get-data-button" onClick={getDataFromAPI}>
        Get Data
      </button>
      <div>
        <h2>Response Header Values:</h2>
        <p>
          Send Byte: <span>{sendBytes.join(', ')} bytes</span>
        </p>
        <p>
          Total Bytes: <span>{/* Calculate and display total bytes here */}</span>
        </p>
        <p>
          Connect Time: <span>{connectTimes.join(', ')} ms</span>
        </p>
      </div>
    </div>
  );
}

export default Ayooo;
