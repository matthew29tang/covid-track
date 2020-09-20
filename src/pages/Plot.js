import React from 'react';
import { curveCatmullRom } from 'd3-shape';
import Styled from "styled-components";
import { dates, ThemeContext } from '../data/data.js';
import Grid from '@material-ui/core/Grid';

import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, DiscreteColorLegend } from 'react-vis';

export default class Plotter extends React.Component {
  static contextType = ThemeContext;

  constructor(props, context) {
    super(props);
    this.DATA = context.data;
    this.dates = dates.slice();
    this.dates.push('9/21/2020');
    this.dates.push('9/28/2020');
    this.state = {
    };
    this.toGraph = this.graph(this.props.granularity, this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.granularity !== this.props.granularity) {
      this.toGraph = this.graph(this.props.granularity, this.props.query);
      console.log("updated")
    }

  }

  formatData = (granularity, query) => {
    var data = this.DATA[granularity];
    const graphData = [];
    const lines = [];
    for (let i = 0; i < data.length; i++) { // Each country
      if (granularity === 0 || (granularity > 0 && query[query.length - 1].includes(data[i][0]))) {
        var curr = []
        for (let j = granularity + 3; j < data[i].length; j++) { // Each point in time for that country
          curr.push({
            x: j,
            y: Math.log(parseInt(data[i][j]) + 1)
          });
        }
        graphData.push(curr);
        lines.push(data[i][granularity]);
      }
    }
    return [lines, graphData];
  }

  graph = (granularity, query) => {
    if (this.state.granularity === granularity) {
      return
    }
    var formatted = this.formatData(granularity, query);

    this.setState({
      lines: formatted[0],
    });
    return formatted[1].map((series, i) =>
      <LineSeries className="series" key={i}
        curve={curveCatmullRom.alpha(0.5)}
        data={formatted[1][i]} />);
  }

  render() {
    return (
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item xs={4}>
          <Wrapper>
            <XYPlot width={600} height={400} margin={{ left: 60, bottom: 60 }}>
              <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
              <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
              <XAxis
                tickFormat={v => this.dates[v].slice(0, -5)} tickLabelAngle={-60}
                title="Time (date by week)"
                style={{
                  line: { stroke: '#ADDDE1' },
                  ticks: { stroke: '#ADDDE1' },
                  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
              />
              <YAxis title="COVID19 Cases in Region (Log)" />

              {this.toGraph}

            </XYPlot>
          </Wrapper>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={1}>
          <DiscreteColorLegend height={350} width={100} items={this.state.lines ? this.state.lines : []} />
        </Grid>
      </Grid>
    );
  }
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
