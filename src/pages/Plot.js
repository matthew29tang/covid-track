import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class Plot extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <p>Hello World</p>
    )
  }
}


export default withStyles(styles)(Plot);

