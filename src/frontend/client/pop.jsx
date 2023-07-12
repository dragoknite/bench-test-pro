import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import styled, { keyframes, css } from 'styled-components';

const StyledContainer = styled.div`
  width: 720px;
`;
const StyledSubContainer = styled.div`
  width: 690px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
`;

const StyledSubSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ChartContainer = styled.div`
  border: ridge 2px black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-template-rows: repeat(2, 1fr);
`;

const popResult = ({ sortedRows, sampleCount }) => {
  let breakPoint = null;
  let totalTime = 0;
  let missingSamples = 0;
  const responseTimes = [];
  const labels = [];
  const labelsTime = [];

  for (let i = 0; i < sortedRows.length; i++) {
    if (sortedRows[i].time !== 'no response') {
      totalTime += parseFloat(sortedRows[i].time);
      labelsTime.push(parseFloat(sortedRows[i].time));
    } 
    else if (sortedRows[i].time === 'no response' && breakPoint === null) {
      breakPoint = sortedRows[i].id + 1;
      labelsTime.push(0);
    } 
    else if (sortedRows[i].time === 'no response') {
      missingSamples += 1;
      labelsTime.push(0);
    }
    labels.push(sortedRows[i].id + 1);
  }


  // Calculate successful rate
  const successfulRate = 100 - (missingSamples / sampleCount) * 100;

  // Doughnut chart data
  const doughnutData = {
    labels: ['Responses Received', 'Responses Missed'],
    datasets: [
      { 
        labels: 'ayooooo',
        data: [sampleCount - missingSamples, missingSamples],
        backgroundColor: ['rgb(40, 165, 50)', 'rgb(200, 50, 75)'],
        hoverBackgroundColor: ['rgb(50, 200, 60)', 'rgb(225, 75, 85)'],
        hoverOffset: 4
      },
    ],
  };
  // Bar chart data
  const barData = {
        labels: labels,
        datasets: [
        {
          label: 'Connect Time',
          data: labelsTime,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: true,
        },
      ],
    };



  return (
    <StyledContainer style={{ width: '900px' }}>
      <h2 style = {{margin: '10px 0px 10px 0px', textAlign: 'center'}}>Analysis Results</h2>
      <StyledSubContainer style={{ width: '890px', height: '500px', border: '10px ridge rgb(25, 25, 25)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '10px', padding: '10px', }}>
      
        <ChartContainer style={{ border: 'ridge 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.35)' }}>
          <StyledSubSubContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ alignSelf: 'center' }}>Total Sample Time:</p>
            <p style={{ alignSelf: 'center' }}>{Math.round(totalTime).toFixed(2)} ms</p>
          </StyledSubSubContainer>
        </ChartContainer>

        <ChartContainer style={{ border: 'ridge 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.35)' }}>
          <StyledSubSubContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ alignSelf: 'center' }}>Breakpoint:</p>
            <p style={{ alignSelf: 'center' }}>{breakPoint ? "Sample # " + breakPoint : "Not Available"}</p>
          </StyledSubSubContainer>
        </ChartContainer>

        <ChartContainer style={{ border: 'ridge 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.35)' }}>
          <StyledSubSubContainer>
            <p>Missing/Error Rate: {Math.round(missingSamples / sampleCount * 100).toFixed(2)} %</p>
          </StyledSubSubContainer>
        </ChartContainer>

        <ChartContainer style={{ border: 'ridge 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.35)' }}>
          <StyledSubSubContainer>
            <p>Total Requests: {sampleCount}</p>
          </StyledSubSubContainer>  
          <StyledSubSubContainer>
            <p>Fail Requests: {missingSamples}</p>
          </StyledSubSubContainer>
        </ChartContainer>

        <ChartContainer style={{ border: 'ridge 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.35)' }}>
        
          <StyledSubSubContainer>
            <p>Connect Time</p>
            <Line data={barData} />
          </StyledSubSubContainer>
        </ChartContainer>

        <ChartContainer style={{ border: 'ridge 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.35)' }}>
          <StyledSubSubContainer>
            <div style={{ position: 'relative', transform: 'translate(32.5%, 195px)', fontSize: '13px', fontWeight: 'bold', color: '#000' }}>
              Response Received
            </div>
            <div
              style={{
                position: 'relative',
                transform:
                  Math.round((sampleCount - missingSamples) / sampleCount * 100).toFixed(2) === '100.00'
                    ? 'translate(40%, 195px)'
                    : 'translate(41.5%, 195px)',
                fontSize: '24px',
                fontWeight: 'bold',
                color:
                  Math.round((sampleCount - missingSamples) / sampleCount * 100).toFixed(2) > 80
                    ? 'green'
                    : Math.round((sampleCount - missingSamples) / sampleCount * 100).toFixed(2) < 60
                    ? 'rgb(40, 40, 100)'
                    : 'rgb(50, 50, 150)',
              }}
            >
              {Math.round((sampleCount - missingSamples) / sampleCount * 100).toFixed(2)}
              <a style={{ fontSize: '13px' }}>%</a>
            </div>
            <Doughnut data={doughnutData} />
          </StyledSubSubContainer>
        </ChartContainer>

      </StyledSubContainer>
    </StyledContainer>
  );
};

export default popResult;
