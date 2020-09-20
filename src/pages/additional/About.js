import React from 'react';

import Divider from '@material-ui/core/Divider';

class About extends React.Component {

  render() {
    return (
      <div className="About">
        <h1>About</h1>
        <Divider />
        <br />
        <div align="left" word-wrap="break-word">
          
          As someone who studied epidemiology for 5 years in high school, the COVID-19 outbreak is surreal; I never thought I'd actually witness a pandemic. With my EECS background, I decided to design an innovative way to visualize COVID-19 cases. This project was envisioned in April 2020 and created at HackMIT 2020 in collaboration with Peter Zhu, Ryan Kee, and Christianna Xu.
          <br /><br />
          There are copious amounts of COVID data, but many existing visualizations have shortcomings. Our interactive visualization excels over traditional methods since users can easily draw conclusions from the multi-dimensional data grouped by varying levels of granularity (continent-level, country-level, etc.) over time. Existing visualizations are usually static x-y plots which fail to communicate more than 2 dimensions or 2d maps with dots which communicate locality but are difficult to interact with and do not show time-series data. 
          <br /><br />
          Our visualization shows a rectangle plot proportional to the rate of increase of cases with a slider to monitor the progression over time. Users can click on each rectangle to see higher levels of granularity and return to previous plots at any time. This method allows for easy comparison to draw conclusions of emerging infection hot-spots. An additional 2d plot of active cases complements the rectangle plot by graphing cases over the entire time period.
          <br />
          <h2>Technologies used</h2>
          <ul>
            <li>Frontend: ReactJS</li>
              <li style={{marginLeft:"2em"}}>Theme: Material UI</li>
              <li style={{marginLeft:"2em"}}>Visualizations: React-vis (based on d3.js)</li>
              <li style={{marginLeft:"2em"}}>Deployment: Github pages</li>
            <li>Data curation: Python</li>
              <li style={{marginLeft:"2em"}}>Libraries: pandas, numpy</li>
             </ul>
             

        </div>
      </div>
    );
  }
}

export default About;