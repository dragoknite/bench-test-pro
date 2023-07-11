import React, { useState, useEffect } from 'react';

function Ayooo() {
  const [apiUrl, setApiUrl] = useState('');
  const [sampleCount, setSampleCount] = useState(1);
  const [connectTimes, setConnectTimes] = useState([]);
  const [requestBody, setRequestBody] = useState('');

  useEffect(() => {
    const sortedConnectTimes = connectTimes.sort((a, b) => a.id - b.id);
    console.log(sortedConnectTimes);
  }, [connectTimes]);

  const getDataFromAPI = () => {
    if (apiUrl === '') {
      alert('Please enter the API URL.');
      return;
    }

    if (isNaN(sampleCount) || sampleCount <= 0) {
      alert('Please enter a valid sample count greater than zero.');
      return;
    }

    setConnectTimes([]); // Reset the table result

    const fetchData = (sampleId) => {
      const connectStartTime = performance.now(); // Start measuring the connect time

      return fetch(apiUrl, { method: 'GET' })
        .then((response) => {
          // Stop measuring the connect time
          const connectEndTime = performance.now();

          // Calculate the connect time in milliseconds
          const connectTime = connectEndTime - connectStartTime;

          return response.blob().then((blob) => {
            setConnectTimes((prevTimes) => [
              ...prevTimes,
              { id: sampleId, time: connectTime.toFixed(2), sendByte: 0, receivedByte: blob.size },
            ]);
            // Use the retrieved data and header values as needed
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          setConnectTimes((prevTimes) => [
            ...prevTimes,
            { id: sampleId, time: 'no response', sendByte: 0, receivedByte: 0 },
          ]);
        });
    };

    const fetchDataPromises = [];

    for (let i = 0; i < sampleCount; i++) {
      fetchDataPromises.push(fetchData(i));
    }

    Promise.all(fetchDataPromises)
      .then(() => {
        console.log('All samples completed.');
        setConnectTimes((prevTimes) => [...prevTimes.sort((a, b) => a.id - b.id)]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const postDataToAPI = () => {
    if (apiUrl === '') {
      alert('Please enter the API URL.');
      return;
    }

    if (requestBody === '') {
      alert('Please enter the request body.');
      return;
    }

    setConnectTimes([]); // Reset the table result

    const fetchData = (sampleId) => {
      const connectStartTime = performance.now(); // Start measuring the connect time

      return fetch(apiUrl, { method: 'POST', body: requestBody })
        .then((response) => {
          // Stop measuring the connect time
          const connectEndTime = performance.now();

          // Calculate the connect time in milliseconds
          const connectTime = connectEndTime - connectStartTime;

          return response.blob().then((blob) => {
            setConnectTimes((prevTimes) => [
              ...prevTimes,
              { id: sampleId, time: connectTime.toFixed(2), sendByte: 0, receivedByte: blob.size },
            ]);
            // Use the retrieved data and header values as needed
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          setConnectTimes((prevTimes) => [
            ...prevTimes,
            { id: sampleId, time: 'no response', sendByte: 0, receivedByte: 0 },
          ]);
        });
    };

    const fetchDataPromises = [];

    for (let i = 0; i < sampleCount; i++) {
      fetchDataPromises.push(fetchData(i));
    }

    Promise.all(fetchDataPromises)
      .then(() => {
        console.log('All samples completed.');
        setConnectTimes((prevTimes) => [...prevTimes.sort((a, b) => a.id - b.id)]);
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
        GET Data
      </button>
      <br />
      <label htmlFor="request-body">Request Body:</label>
      <textarea
        id="request-body"
        name="request-body"
        placeholder="Enter request body"
        value={requestBody}
        onChange={(e) => setRequestBody(e.target.value)}
      ></textarea>
      <button id="post-data-button" onClick={postDataToAPI}>
        POST Data
      </button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sample ID</th>
              <th>Connect Time (ms)</th>
              <th>SendByte</th>
              <th>ReceivedByte</th>
            </tr>
          </thead>
          <tbody>
            {connectTimes
              .sort((a, b) => a.id - b.id)
              .map((sample) => (
                <tr key={sample.id} style={{ color: sample.time === 'no response' ? 'red' : 'black' }}>
                  <td>{sample.id}</td>
                  <td>{sample.time === 'no response' ? 'No Response' : `${sample.time} ms`}</td>
                  <td>{sample.sendByte}</td>
                  <td>{sample.receivedByte}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ayooo;
