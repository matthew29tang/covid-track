import React from 'react';
import Papa from 'papaparse';
import { USurl } from './config.js';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, DiscreteColorLegend } from 'react-vis';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  homeImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  homeText: {
    fontSize: 20,
  }
});


class USGraphs extends React.Component {
  constructor() {
    super();
    this.data = []
    this.rows = []
    this.state = {
      series: []
    }
    this.graphStates = ["New York", "New Jersey", "Massachusetts", "California", "Washington"]

    Papa.parse(USurl, {
      download: true,
      complete: (results) => {
        console.log(results.data)
        this.rows = results.data[0];
        for (var r = 1; r < results.data.length; r++) {
          var dataPoint = {};
          var row = results.data[r];
          var last = parseFloat(row.slice(-1)[0]);
          var llast = parseFloat(row.slice(-2)[0]);
          if (typeof last == 'number' && last > 0) {
            dataPoint['numCases'] = last;
          } else if (typeof llast == 'number' && llast > 0) {
            dataPoint['numCases'] = llast;
          } else {
            continue;
          }

          dataPoint['id'] = r;
          dataPoint['state'] = row[0];
          dataPoint['country'] = row[1];
          dataPoint['lat'] = parseFloat(row[2]);
          dataPoint['long'] = parseFloat(row[3]);
          this.data.push(dataPoint);
        }

        this.graphStates.map(stateName => this.extractUSRow(stateName, results));
      }
    });


  }

  extractUSRow = (stateName, results) => {
    var row = [];
    for (let i = 0; i < results.data.length; i++) {
      if (results.data[i][6] === stateName) {
        var tempRow = results.data[i].slice();
        tempRow = tempRow.map(x => parseInt(x));
        row.push(tempRow);
      }
    }
    var usRow = [];
    for (let i = 11; i < row[0].length; i++) {
      usRow.push(row.map(stateRow => stateRow[i]).reduce((a, b) => a + b, 0));
    }

    row = usRow.filter(x => x > 1000);
    var cases = [];
    for (let i = 0; i < row.length; i++) {
      cases.push({ x: i, y: row[i] });
    }

    this.setState((prevState) => {
      prevState.series.push({
        title: stateName,
        disabled: false,
        data: cases
      });
      return { series: prevState.series }
    });
  }

  render() {
    return (
      <center>
        <h2 style={{ marginTop: 0 }}> Cases vs Number of Days</h2>
        <XYPlot
          margin={{ left: 60 }}
          width={1200}
          height={500}>

          <HorizontalGridLines />
          <VerticalGridLines />

          {this.state.series.map(series => {
            return <LineSeries
              data={series.data} />
          })}

          <XAxis title={"Number of days after >1,000 cases"} />
          <YAxis title={"Number of cases"} />
          <DiscreteColorLegend
            width={500}
            items={this.state.series}
            orientation="horizontal"
          />
        </XYPlot>
        <br/><br/>
        Panel Data taken from: CSSEGISandData (JHU) [Updates in real time]
      </center>
    )
  }
}


export default withStyles(styles)(USGraphs);

