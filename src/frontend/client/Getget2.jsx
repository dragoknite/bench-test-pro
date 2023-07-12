import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';


const StyleRequestBodyInput = styled.textarea`
  width: 35%;
  height: 200px;
  font-size: 12px;
`;

const StyledTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 5px ridge rgb(3, 45, 67);
`;

const StyledTable = styled.table`
  min-width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin: 3px;
`;

const StyledTh = styled.th`
  position: relative;
  width: 150px;
  border: 1px solid #555;
  background-color: rgb(0, 10, 30);
  color: #fff;
  padding: 8px;
  cursor: pointer;
  font-size: 16px;

  > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    resize: horizontal;
    padding-right: 16px;
    box-sizing: border-box;
  }
`;

const StyledTd = styled.td`
    border: 1px solid #555;
    padding: 5px 8px;
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
`;

function Ayooo() {
  const [apiUrl, setApiUrl] = useState('');
  const [sampleCount, setSampleCount] = useState(1);
  const [connectTimes, setConnectTimes] = useState([]);
  const [requestBody, setRequestBody] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleColumnClick = (column) => {
    if (sortColumn === column) {
      // Toggle sort direction if the same column is clicked
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      // Sort by the clicked column in ascending order by default
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  const sortedRows = [...connectTimes];
  if (sortColumn) {
    sortedRows.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }



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
          });
        })
        .catch((error) => {
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
          const sendSize = new Blob([requestBody]).size;
      
          return response.blob().then((blob) => {
            setConnectTimes((prevTimes) => [
              ...prevTimes,
              { id: sampleId, time: connectTime.toFixed(2), sendByte: sendSize, receivedByte: blob.size },
            ]);
          });
        })
        .catch((error) => {
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
      });
  };

  const patchDataToAPI = () => {
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

      return fetch(apiUrl, { method: 'PATCH', body: requestBody })
        .then((response) => {
          // Stop measuring the connect time
          const connectEndTime = performance.now();
      
          // Calculate the connect time in milliseconds
          const connectTime = connectEndTime - connectStartTime;
          const sendSize = new Blob([requestBody]).size;
      
          return response.blob().then((blob) => {
            setConnectTimes((prevTimes) => [
              ...prevTimes,
              { id: sampleId, time: connectTime.toFixed(2), sendByte: sendSize, receivedByte: blob.size },
            ]);
          });
        })
        .catch((error) => {
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
      });
  };

  const putDataToAPI = () => {
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

      return fetch(apiUrl, { method: 'PUT', body: requestBody })
        .then((response) => {
          // Stop measuring the connect time
          const connectEndTime = performance.now();
      
          // Calculate the connect time in milliseconds
          const connectTime = connectEndTime - connectStartTime;
          const sendSize = new Blob([requestBody]).size;
      
          return response.blob().then((blob) => {
            setConnectTimes((prevTimes) => [
              ...prevTimes,
              { id: sampleId, time: connectTime.toFixed(2), sendByte: sendSize, receivedByte: blob.size },
            ]);
          });
        })
        .catch((error) => {
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
      });
  };

  const deleteDataFromAPI = () => {
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

      return fetch(apiUrl, { method: 'DELETE' })
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
          });
        })
        .catch((error) => {
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
      });
  };

  return (
    <div>
      <h1>REST API Request Loading Test</h1>
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
      <StyleRequestBodyInput
        id="request-body"
        name="request-body"
        placeholder="Enter request body"
        value={requestBody}
        onChange={(e) => setRequestBody(e.target.value)}
      ></StyleRequestBodyInput>
      <button id="post-data-button" onClick={postDataToAPI}>
        POST Data
      </button>
      <button id="put-data-button" onClick={putDataToAPI}>
        PUT Data
      </button>
      <button id="patch-data-button" onClick={patchDataToAPI}>
        PATCH Data
      </button>
      <button id="delete-data-button" onClick={deleteDataFromAPI}>
        DELETE Data
      </button>
      <div>
      <StyledTableWrapper>
        <StyledTable>
          <table>
            <thead>
              <tr>
              <StyledTh onClick={() => handleColumnClick('id')}>Sample #</StyledTh>
              <StyledTh onClick={() => handleColumnClick('time')}>Connect Time (ms)</StyledTh>
              <StyledTh onClick={() => handleColumnClick('sendByte')}>SendByte</StyledTh>
              <StyledTh onClick={() => handleColumnClick('receivedByte')}>ReceivedByte</StyledTh>
              </tr>
            </thead>
            <tbody>
              {sortedRows

                .map((sample) => (
                  <tr key={sample.id} style={{ color: sample.time === 'no response' ? 'red' : 'rgb(25, 125, 35)' }}>
                    <StyledTd>{sample.id + 1}</StyledTd>
                    <StyledTd>{sample.time === 'no response' ? 'No Response' : `${sample.time} ms`}</StyledTd>
                    <StyledTd>{sample.sendByte}</StyledTd>
                    <StyledTd>{sample.receivedByte}</StyledTd>
                  </tr>
                ))}
            </tbody>
          </table>
        </StyledTable>
      </StyledTableWrapper>
      </div>
    </div>
  );
}

export default Ayooo;
