import React from "react";
import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import Notfound from "./notfound.js";
import Map from '../pages/Map.js';
import Plot from '../pages/Plot.js';
import TreeMap from '../pages/TreeMap.js';

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <div className="Router">
          <Switch>
            <Route exact path="/" component={Map} />
            {/* <Route exact path="/" component={TreeMap} /> */}
            <Route component={Notfound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routing;
