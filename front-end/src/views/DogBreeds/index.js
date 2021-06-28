import React from 'react';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';
import Header from './Header';
import Details from './Details';

const DogBreeds = () => {
  return (
    <Box>
      <Header />
      <Details />
    </Box>
  );
};

export default DogBreeds;
