import React from 'react';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
const About = () => {
  return (
    <div>
      <Header />
      <Typography variant="h3" gutterBottom>
        KGNet - CoDs
      </Typography>
    </div>
  );
};

export default About;
