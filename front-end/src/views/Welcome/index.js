import React from 'react';
import Details from './Details';
import { makeStyles } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '250px'
  }
}));
const WelcomePage = () => {
  const classes = useStyles();
  return (
    <React.Fragment className={classes.root}>
      <Header />
      <Details />
    </React.Fragment>
  );
};

export default WelcomePage;
