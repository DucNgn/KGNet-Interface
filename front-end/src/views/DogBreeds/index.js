import React from 'react';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';
import Header from './Header';
const DogBreeds = () => {
  return (
    <Box>
      <Header />
      <Paper>
        <Typography variant="body1">Hello in dog</Typography>
      </Paper>
    </Box>
  );
};

export default DogBreeds;
