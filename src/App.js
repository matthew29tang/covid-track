import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Papa from 'papaparse';

import Routing from './router/Routing.js';

import { ThemeContext } from './data/data.js';


class App extends React.Component {
  constructor() {
    super();
    this.DATA = [];
    this.state = {
      loaded: false
    }
    Papa.parse('https://raw.githubusercontent.com/matthew29tang/covid-track/master/src/data/continent-data.csv', {
      download: true,
      complete: (continent) => {
        Papa.parse('https://raw.githubusercontent.com/matthew29tang/covid-track/master/src/data/country-data.csv', {
          download: true,
          complete: (country) => {
            this.DATA.push(continent.data.slice(1));
            this.DATA.push(country.data.slice(1));
            this.setState({loaded: true});
          }
        })
      }
    });
  }
  render() {
    return (
      <ThemeContext.Provider value={{
        data: this.DATA
      }}>
        <div className="App" style={{ backgroundColor: "#F6F6F6", paddingBottom: 20 }} >
          <AppBar position="static" >
            <Toolbar style={{ fontSize: "19px" }}>Covid Track</Toolbar>
          </AppBar>
          <br />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Box width="75%" maxWidth={1000}>
              {this.DATA.length > 0 ? <Routing /> : ''}
            </Box>
          </Grid>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;