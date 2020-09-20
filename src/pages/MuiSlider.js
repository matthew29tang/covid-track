import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  body: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 70,
    paddingRight: 70,
  },
}));

function getMarks(dates) {
  var marks = [];
  for (var i = 0; i < dates.length; i++) {
      marks.push({
        value: i,
        label: (i % 2 === 0  ? dates[i].slice(0, -5) : '')
      });
  }
  return marks;
}

export default function MuiSlider(props) {
  const classes = useStyles();
  const marks = getMarks(props.dates);

  return (
    <div>
      <br />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Box width="75%">
          <Typography id="discrete-slider-restrict" gutterBottom className={classes.body}>
            {props.question}
          </Typography>
          <Slider
            defaultValue={0}
            valueLabelFormat={(value) => marks.findIndex(mark => mark.value === value) + 1}
            getAriaValueText={(value) => `${value}`}
            aria-labelledby="discrete-slider-restrict"
            step={1}
            min={0}
            max={props.dates.length - 1}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={props.onChange}
          />
        </Box>
      </Grid>
    </div>
  );
}