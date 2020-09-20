import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, Circle } from "react-google-maps";
import MuiSlider from "./MuiSlider.js";
import { dates } from "../data/data.js";

import styles from './GoogleMapsStyles.js';

const test_country_data = [["United States", 37.090240, -95.712891, 203], ["Canada", 56.130367, -106.346771, 1234]]
function numDigits(number) {
  return number.toString().length;
}

function MapSetUp() {
  return (
    <GoogleMap 
      defaultZoom={5} 
      defaultCenter={{ lat: 37.871593, lng: -122.272743}}
      defaultOptions={{
        styles: styles
      }}
      >
      {test_country_data.map((country) => (
        <Marker 
          key={country[0]} 
          position = {{
            lat: country[1],
            lng: country[2]
          }}
          label={{
            color: '#1f4272',
            strokeColor: '#ff0200',
            strokeWeight: 1,
            fontWeight: 'bold',
            fontSize: '12px',
            text: String(country[3]),
          }}
        />
      ))}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(MapSetUp));

export default function Map() { 
    return (
        <div>
          <WrappedMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `84vh`}} />}
          mapElement={<div style={{ height: `84vh`, }} />}
        />
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
        </div>

    );
}