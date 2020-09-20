import React from 'react';
import Map from './Map.js';
import Papa from 'papaparse';
import {key, url} from './config.js';
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

class PlotMap extends React.Component {
  constructor() {
    super();
    this.data = []

    Papa.parse(url, {
      download: true,
      complete: (results) => {

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
        
     }
    })
  }

  render() {
    return (
      <div>
      <Map
        center={{ lat: 40, lng: -100 }}
        zoom={5}
        places={this.data}
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=' + key}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `80vh` }} />}
        mapElement={<div style={{ height: `80vh` }} />}
      />
      <br/>
      Panel Data taken from: CSSEGISandData (JHU) [Updates in real time]
      </div>
    )
  }
}


export default withStyles(styles)(PlotMap);

