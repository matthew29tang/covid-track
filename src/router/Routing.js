import React from "react";
import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import Notfound from "./notfound.js";
import Plot from '../pages/Plot.js';

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <div className="Router">
          <Switch>
            <Route exact path="/" component={Plot} />
            <Route component={Notfound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routing;
