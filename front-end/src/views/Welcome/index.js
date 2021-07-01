import React from 'react';
import Details from './Details';
import Header from './Header';
import Page from '../../components/Page';

const WelcomePage = () => {
  return (
    <Page title="KGNET - Companies Similarities">
      <Header />
      <Details />
    </Page>
  );
};

export default WelcomePage;
