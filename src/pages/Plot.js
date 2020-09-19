import React from 'react';
import {curveCatmullRom} from 'd3-shape';
import Styled from "styled-components";
// import { withStyles } from '@material-ui/core/styles';

import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';

// sample test data for data 1 on first-series
var data1 = [{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 10}, {x: 4, y: 2}];
// input would be an array of some lengths of cases per week
// x is set from 1 to length for time, y is the cases - currently random
var data2 = [];
var i;
for (i = 1; i < 10; i++) {
  data2.push({x: i, y: Math.floor(Math.random() * 10)});
}

const handleLogout = (evt) => {};

export default function Plotter(props) {
  return (
    <Wrapper>
      <button onClick={()=> handleLogout()}>Logout</button> 
      <XYPlot width={300} height={300}>
        <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
        <VerticalGridLines style={{stroke: '#B7E9ED'}} />
        <XAxis
          title="Time (weeks since January)"
          style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
          }}
        />
        <YAxis title="COVID19 Cases in Region" />
        <LineSeries className="first-series"
          data={data1}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 4
          }}
        />
        <LineSeries className="second-series" data={null} />
        <LineSeries
          className="third-series"
          curve={'curveMonotoneX'}
          data={data2}
          strokeDasharray="7, 3"
        />
        <LineSeries className="fourth-series"
          curve={curveCatmullRom.alpha(0.5)}
          data={[{x: 1, y: 7}, {x: 2, y: 11}, {x: 3, y: 9}, {x: 4, y: 2}]}
        />
      </XYPlot>
  </Wrapper>
  );
}


const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;

  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #0041C2;

    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }

  >div{
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;

    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      width: auto;
  
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
      >span:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
      }
  
      >span:not(:nth-child(2)){
        margin-top: 8px;
        font-size: 14px;
      }
  
    }

  }
}
`;

// const styles = theme => ({
// });

// class Plot extends React.Component {
//   constructor() {
//     super();
//   }

//   render() {
//     return (
//       // <p>Hello World</p>
//       <XYPlot
//         width={300}
//         height={300}>
//         <HorizontalGridLines />
//         <LineSeries
//           data={[
//             {x: 1, y: 10},
//             {x: 2, y: 5},
//             {x: 3, y: 15}
//           ]}/>
//         <XAxis />
//         <YAxis />
//       </XYPlot>
//     )
//   }
// }


// // export default withStyles(styles)(Plot);

