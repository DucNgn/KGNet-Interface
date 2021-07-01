import React from 'react';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';
import Header from './Header';
import Details from './Details';
import Page from '../../components/Page';

const DogBreeds = () => {
  return (
    <Page title="KGNET - Dog Breed Finder">
      <Box>
        <Header />
        <Details />
      </Box>
    </Page>
  );
};

export default DogBreeds;
