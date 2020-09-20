import React, { Fragment } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle,
} from "react-google-maps";

import styles from './GoogleMapsStyles.js';

function getRadius(numCases) {
  console.log(numCases, Math.log(numCases))
  return 20000 * Math.log(numCases);
}

const Map = props => {
  return (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={props.center}
      defaultOptions={{
        disableDefaultUI: true, // disable default map UI
        draggable: true, // make map draggable
        keyboardShortcuts: false, // disable keyboard shortcuts
        scaleControl: true, // allow scale controle
        scrollwheel: true, // allow scroll wheel
        styles: styles // change default map styles
      }}
    >
      {props.places.map(place => {
        console.log(place)
        return (
          <Fragment key={place.id}>
            <Circle
              defaultCenter={{
                lat: place.lat,
                lng: place.long
              }}

              radius={getRadius(place.numCases)}
              options={{
                fillColor: "#ff0200",
                fillOpacity: 0.5,
                strokeColor: '#740000',
                strokeWeight: 3,
              }}

            />
            <Marker
              position={{
                lat: place.lat,
                lng: place.long
              }}
              label={{
                color: '#1f4272',
                strokeColor: '#ff0200',
                strokeWeight: 1,
                fontWeight: 'bold',
                fontSize: '12px',
                text: String(place.numCases),
              }}
            />
          </Fragment>
        );
      })}
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
