import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ReactDOM from 'react-dom';
import popResult from './pop';

const StyledContainer = styled.div`
  width: 710px;
  border: 10px ridge rgb(25, 25, 25);
  /* Media query for smaller screens */
  @media (max-width: 700px) {
    min-width: 700px;
  }
`;

const StyledSubContainer = styled.div`

  width: 700px;
  margin: 5px;
`;

const StyledParaDiv = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const StyledParaDiv2 = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
`;

const StyledSmallDiv = styled.div`
  margin: 15px 0px;
  display: flex;
`;

const StyledApiURLinput = styled.input`
  width: 400px;
  font-size: 12px;
`;

const StyledSampleinput = styled.input`
  width: 75px;
  font-size: 12px;
`;

const StyledDropDownOption = styled.select`
  font-size: 12px;
  width: 85px;
`;

const StyleRequestBodyInput = styled.textarea`
  width: 400px;
  height: 200px;
  font-size: 12px;
`;

const StyledTableWrapper = styled.div`
  width: 690px;
  border: 5px ridge rgb(25, 25, 25);
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
  borderRadius: 10px;
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

const glowingButton = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

const Button = styled.button`
  padding: 0.6em 2em;
  border: none;
  color: rgb(255, 255, 255);
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 1rem;
  
  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 200%;
    z-index: -1;
    filter: blur(4px);
    -webkit-filter: blur(4px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowingButton} 10s infinite;
    transition: opacity 0.3s cubic-bezier(0.1, -0.6, 0.2, 0);
    border-radius: 10px;
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  /* Additional class for removing the gradient styling */
  &.no-gradient {
    &:before {
      display: none;
    }
  }
`;



function Ayooo() {
  const [apiUrl, setApiUrl] = useState('');
  const [sampleCount, setSampleCount] = useState(1);
  const [connectTimes, setConnectTimes] = useState([]);
  const [requestBody, setRequestBody] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [timeDontShowSummary, setTimeDontShowSummary] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [timeDontRun, setTimeDontRun] = useState(false);


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


  const handleShowResult = () => {
  
    const analysisWindow = window.open('', 'Analysis', 'width=800,height=600');

    // const styles = `
    // body {
    //   background-color: red;
    // }
    // `

    // const styleElement = analysisWindow.document.createElement('style')
    // styleElement.textContent = styles;
    // analysisWindow.document.head.appendChild(styleElement)
  
    const popResultElement = React.createElement(popResult, {
      sortedRows: sortedRows,
      sampleCount: sampleCount,
    });
  
    ReactDOM.render(popResultElement, analysisWindow.document.body);
  

  };
  
  const handleRunRequest = () => {
    if(timeDontShowSummary === false){
      setTimeDontShowSummary(true);
      setTimeDontRun(true);
    }
    if(selectedMethod === 'GET'){
      getDataFromAPI();
    }
    else if(selectedMethod === 'POST'){
      postDataToAPI();
    }
    else if(selectedMethod === 'PUT'){
      putDataToAPI();
    }
    else if(selectedMethod === 'PATCH'){
      patchDataToAPI();
    }
    else if(selectedMethod === 'DELETE'){
      deleteDataFromAPI();
    }
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
      .then(() => {
        setTimeDontShowSummary(false);
        setTimeDontRun(false);
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
      .then(() => {
        setTimeDontShowSummary(false);
        setTimeDontRun(false);
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
      .then(() => {
        setTimeDontShowSummary(false);
        setTimeDontRun(false);
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
      .then(() => {
        setTimeDontShowSummary(false);
        setTimeDontRun(false);
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
      .then(() => {
        setTimeDontShowSummary(false);
        setTimeDontRun(false);
      })
      .catch((error) => {
      });
  };
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //
  // When closing the pop-out analysis window, an 'ResizeObserver loop limit exceeded' error is encountered, originating from the React chart component.
  // Currently, a proper solution for this issue is not available as of 07/12/2023.
  // This useEffect is implemented to handle the error gracefully and allow users to continue using the app.
  useEffect(() => {
    window.addEventListener('error', e => {
        if (e.message === 'ResizeObserver loop limit exceeded') {
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            );
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            );
            if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none');
            }
            if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none');
            }
        }
    });
  }, []);
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// //


 
  

  return (
    <StyledContainer>
      <StyledSubContainer>

      <h1>REST API Request Loading Test</h1>     
      <StyledParaDiv>
        <StyledSmallDiv>
          <label>HTTP Method Selection: </label><br />
        </StyledSmallDiv>
        <StyledSmallDiv>
          <label htmlFor="api-url">API URL:</label><br />
        </StyledSmallDiv>
        <StyledSmallDiv>
          <label htmlFor="sample-count" style={{margin:'2px 0px 0px 0px'}}>Sample Count:</label><br />
        </StyledSmallDiv>
        <StyledSmallDiv>
          <label htmlFor="request-body" style={{margin:'3px 0px 0px 0px'}}>Request Body:</label><br />
        </StyledSmallDiv>
      </StyledParaDiv>
      <StyledParaDiv2>
        <StyledSmallDiv>
          <StyledDropDownOption value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </StyledDropDownOption><br />
        </StyledSmallDiv>
        <StyledSmallDiv>
          <StyledApiURLinput
          type="text"
          id="api-url"
          name="api-url"
          placeholder="Enter API endpoint URL"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          /><br />
        </StyledSmallDiv>
        <StyledSmallDiv>
          <StyledSampleinput
          type="number"
          id="sample-count"
          name="sample-count"
          min="1"
          value={sampleCount}
          onChange={(e) => setSampleCount(parseInt(e.target.value))}
          />
          <Button id="run-request-button" onClick={handleRunRequest} disabled={timeDontRun} className={timeDontRun && timeDontShowSummary ? 'no-gradient' : ''}>
            Run Request
          </Button>
          <Button id="show-result-button" onClick={handleShowResult} disabled={timeDontShowSummary} className={timeDontRun && timeDontShowSummary ? 'no-gradient' : ''}>
            Show Analyzation
          </Button>
          <br />
        </StyledSmallDiv>
        <StyledSmallDiv>
          <StyleRequestBodyInput
          id="request-body"
          name="request-body"
          placeholder="Enter request body"
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          ></StyleRequestBodyInput>
        </StyledSmallDiv>
      </StyledParaDiv2>
      
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
                {sortedRows.map((sample) => (
                  <tr
                    key={sample.id}
                    style={{ color: sample.time === 'no response' ? 'red' : 'rgb(25, 125, 35)' }}
                  >
                    <StyledTd>{sample.id + 1}</StyledTd>
                    <StyledTd>
                      {sample.time === 'no response' ? 'No Response' : `${sample.time} ms`}
                    </StyledTd>
                    <StyledTd>{sample.sendByte}</StyledTd>
                    <StyledTd>{sample.receivedByte}</StyledTd>
                  </tr>
                ))}
              </tbody>
            </table>
          </StyledTable>
        </StyledTableWrapper>
      </div>
      </StyledSubContainer>
    </StyledContainer>
  );
}
export default Ayooo;
