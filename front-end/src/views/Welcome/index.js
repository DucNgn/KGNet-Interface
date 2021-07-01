import React from 'react';
import Details from './Details';
import { makeStyles } from '@material-ui/core';
import Header from './Header';
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '250px'
  }
}));
const WelcomePage = () => {
  const classes = useStyles();
  return (
    <Page title="KGNET - Companies Similarities">
      <Header />
      <Details />
    </Page>
  );
};

export default WelcomePage;
