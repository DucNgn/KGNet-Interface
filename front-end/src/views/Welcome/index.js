import React from 'react';
import Details from './Details';
import Page from '../../components/Page';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '250px'
  }
}));
const WelcomePage = () => {
  const classes = useStyles();
  return (
    <React.Fragment className={classes.root}>
      <Details />
      hello ????
    </React.Fragment>
  );
};

export default WelcomePage;
