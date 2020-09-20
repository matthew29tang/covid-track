import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Treemap } from 'react-vis';
import Button from '@material-ui/core/Button';
import MuiSlider from './MuiSlider.js';

import { dates, ThemeContext } from '../data/data.js';

var countryData = [
  ['North America', 'United States', '30', '50'],
  ['North America', 'Canada', '20', '25'],
  ['North America', 'Mexico', '10', '20'],
  ['South America', 'Brazil', '5', '50'],
  ['South America', 'Argentina', '10', '15'],
  ['Asia', 'China', '10', '11']
]

var continentData = [
  ['North America', '60', '50'],
  ['South America', '20', '25'],
  ['Asia', '10', '20'],
]

var DATA = [continentData, countryData]
const COLORS = ['#A7ADC6', '#8797AF', '#56667A', '#9098B6', '#788AA5', '#A9B5C6']

const styles = theme => ({
  button: {
    margin: theme.spacing(2),
  },
});

class TreeMap extends React.Component {
  static contextType = ThemeContext;

  constructor(props, context) {
    super(props);
    this.DATA = context.data;
    this.DELTAS = [[], []];
    for (var dataset = 0; dataset < 2; dataset++) {
      for (var row = 0; row < this.DATA[dataset].length; row++) {
        // Add Continent, Country
        this.DELTAS[dataset].push([this.DATA[dataset][row][dataset]]);
        if (dataset === 1) {
          this.DELTAS[dataset][row].unshift([this.DATA[dataset][row][0]]);
        }
        // Calculate deltas
        for (var col = 2 + dataset; col < this.DATA[dataset][row].length; col++) {
          var curr = this.DATA[dataset][row][col] - this.DATA[dataset][row][col - 1];
          var res = 1;
          if (curr === 0) {
            res = 0;
          } else if (this.DATA[dataset][row][col - 1] === 0) {
            res = 1;
          } else {
            res = Math.round(curr / this.DATA[dataset][row][col - 1] * 100) / 100;
          }
          this.DELTAS[dataset][row].push(res);
        }
      }
    }
    
    console.log(this.DELTAS);
    this.state = {
      hoveredNode: false,
      treemapData: this.getData(0, 0),
      useCirclePacking: false,
      granularity: 0,
      query: [],
      week: 0,
    };
  }

  _getColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  //Granularity: 0: Continent, 1: Country
  getData = (granularity, week) => {
    var data = this.state ? this.DELTAS[granularity] : this.DELTAS[0];
    const leaves = [];
    for (let i = 0; i < data.length; i++) {
      if (granularity === 0 || (granularity > 0 && this.state.query[this.state.query.length - 1].includes(data[i][0]))) {
        var cases = data[i][1 + granularity + week];
        console.log(data[i])
        leaves.push({
          name: data[i][granularity] + ' (' + cases + ')',
          size: Math.log(cases + 1) + 1,
          color: this._getColor(),
          style: {
            border: 'thin solid blue'
          }
        });
      }
    }
    return {
      title: '',
      color: this._getColor(),
      children: leaves
    };
  }

  changeData = (delta, hoveredNode) => {
    // Validate delta
    if ((delta < 0 && this.state.granularity === 0) || (delta > 0 && this.state.granularity === this.DELTAS.length - 1)) {
      return;
    }

    // Adjust query
    if (delta > 0 && hoveredNode) {
      this.state.query.push(hoveredNode.data.name);
    } else {
      this.state.query.pop();
    }

    // Increment the state variables for the new delta
    this.setState((prevState) => {
      return {
        granularity: prevState.granularity + delta,
        treemapData: this.getData(prevState.granularity + delta, prevState.week),
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { hoveredNode, useCirclePacking } = this.state;
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300
      },
      data: this.state.treemapData,
      onLeafMouseOver: x => this.setState({ hoveredNode: x }),
      onLeafMouseOut: () => this.setState({ hoveredNode: false }),
      onLeafClick: () => this.changeData(1, hoveredNode),
      height: 500,
      mode: this.state.useCirclePacking ? 'circlePack' : 'squarify',
      getLabel: x => x.name,
      width: 600
    };
    return (
      <div className="treemap">
        <MuiSlider dates={dates}
          onChange={(event, newValue) => {
            if (newValue !== this.state.week) {
              this.setState({
                week: newValue,
                treemapData: this.getData(this.state.granularity, newValue)
              })
            }
          }
          }/>

        <Button variant="contained" color="primary" className={classes.button}
          onClick={() => this.setState({ useCirclePacking: !useCirclePacking })}
        >{this.state.useCirclePacking ? "Square View" : "Circle View"}</Button>
        <br />
        <Treemap {...treeProps} colorType='literal' />
        {hoveredNode && hoveredNode.data && hoveredNode.data.name}
        <br />
        <Button variant="contained" color="primary" className={classes.button}
          onClick={() => this.changeData(-1, null)} disabled={this.state.granularity === 0}
        >Back</Button>
        {this.state.week}
      </div>
    );
  }
}

export default withStyles(styles)(TreeMap);