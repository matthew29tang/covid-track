import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Papa from 'papaparse';

import Routing from './router/Routing.js';
import {
  HashRouter as Router,
  NavLink
} from "react-router-dom";

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
            this.setState({ loaded: true });
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
            <Toolbar>
              <Router>
                <div style={{ flex: 1, fontSize: "19px", textAlign: "left" }}><NavLink activeClassName="active" className="link" to={"/"} type="menu">CoVisualize</NavLink></div>
                
                <NavLink activeClassName="active" className="link" to={"/"} type="menu" style={{ marginRight: '10px' }}>
                  <Button color="inherit">Rect Plot</Button>
                </NavLink>
                <NavLink activeClassName="active" className="link" to={"/map/"} type="menu" style={{ marginRight: '10px' }}>
                  <Button color="inherit">Map</Button>
                </NavLink>
                <NavLink activeClassName="active" className="link" to={"/global-graph/"} type="menu" style={{ marginRight: '10px' }}>
                  <Button color="inherit">Global Graph</Button>
                </NavLink> 
                <NavLink activeClassName="active" className="link" to={"/us-graph/"} type="menu" style={{ marginRight: '10px' }}>
                  <Button color="inherit">US Graph</Button>
                </NavLink>  
                <NavLink activeClassName="active" className="link" to={"/about/"} type="menu" style={{ marginRight: '10px' }}>
                  <Button color="inherit">About</Button>
                </NavLink> 
              </Router>
            </Toolbar>
          </AppBar>
          <br />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Box width="85%" maxWidth={1500}>
              {this.DATA.length > 0 ? <Routing /> : ''}
            </Box>
          </Grid>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;