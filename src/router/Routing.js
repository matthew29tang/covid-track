import React from "react";
import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import Notfound from "./notfound.js";
import TreeMap from '../pages/TreeMap.js';
import PlotMap from '../pages/additional/PlotMap.js';
import Graphs from '../pages/additional/Graphs.js';
import USGraphs from '../pages/additional/USGraphs.js';
import About from '../pages/additional/About.js';

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <div className="Router">
          <Switch>
            <Route exact path="/" component={TreeMap} />
            <Route path="/map" component={PlotMap} />
            <Route path="/global-graph" component={Graphs} />
            <Route path="/us-graph" component={USGraphs} />
            <Route path="/about" component={About} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routing;
