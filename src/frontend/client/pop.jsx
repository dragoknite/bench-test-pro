import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);
import styled, { keyframes, css } from 'styled-components';

const StyledContainer = styled.div`
  width: 700px;
  height: 420px;
  border: 1px solid black;
`;
const StyledSubContainer = styled.div`
    width: 690px;
    height: 400px;
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
`;

const StyledSubSubContainer = styled.div`
    background: gold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
`;

const ChartContainer = styled.div`
border: solid 2px black;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const popResult = ({ sortedRows, sampleCount }) => {
  let breakPoint = null;
  let totalTime = 0;
  let missingSamples = 0;

  for (let i = 0; i < sortedRows.length; i++) {
    if (sortedRows[i].time !== 'no response') {
      totalTime += parseFloat(sortedRows[i].time);
    } else if (sortedRows[i].time === 'no response' && breakPoint === null) {
      breakPoint = sortedRows[i].id + 1;
    } else if (sortedRows[i].time === 'no response') {
      missingSamples += 1;
    }
  }

  // Calculate successful rate
  const successfulRate = 100 - (missingSamples / sampleCount) * 100;

  // Doughnut chart data
  const data = {
    labels: ['Successful Rate', 'Missing/Error Rate'],
    datasets: [
      {
        data: [sampleCount - missingSamples, missingSamples],
        backgroundColor: ['rgb(40, 165, 50)', 'rgb(200, 50, 75)'],
        hoverBackgroundColor: ['rgb(50, 200, 60)', 'rgb(225, 75, 85)'],
      },
    ],
  };

  return (
    <StyledContainer style={{ width: '720px', border: '1px solid black' }}>
      <h2>Analysis Results</h2>
      <StyledSubContainer style={{ width: '690px', height: '400px', border: '1px solid black', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '10px', padding: '10px' }}>
        <ChartContainer style = {{ border: 'solid 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <StyledSubSubContainer style={{ backgroundColor: 'gold' }}>
            <p>Total Sample Time: {Math.round(totalTime * 10000) / 10000} ms</p>
          </StyledSubSubContainer>
        </ChartContainer>
  
        <ChartContainer style = {{ border: 'solid 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <StyledSubSubContainer>
            <p>Breakpoint: {breakPoint}</p>
          </StyledSubSubContainer>
        </ChartContainer>
  
        <ChartContainer style = {{ border: 'solid 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <StyledSubSubContainer>
            <p>Missing/Error Rate: {Math.round(missingSamples / sampleCount * 100).toFixed(3) + '%'}</p>
          </StyledSubSubContainer>
        </ChartContainer>
  
        <ChartContainer style = {{ border: 'solid 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <StyledSubSubContainer>
            <p>Total Requests: {sampleCount}</p>
          </StyledSubSubContainer>
        </ChartContainer>
  
        <ChartContainer style = {{ border: 'solid 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <StyledSubSubContainer>
            <p>Fail Requests: {missingSamples}</p>
          </StyledSubSubContainer>
        </ChartContainer>
  
        <ChartContainer style = {{ border: 'solid 2px black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <StyledSubSubContainer>
            <Doughnut data={data} />
          </StyledSubSubContainer>
        </ChartContainer>
      </StyledSubContainer>
    </StyledContainer>
  );
  
};

export default popResult;
