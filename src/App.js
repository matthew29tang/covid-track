import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Routing from './router/Routing.js';

import { ThemeContext } from './data/data.js';

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={{
        data: 'data'
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
              <Routing />
            </Box>
          </Grid>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;