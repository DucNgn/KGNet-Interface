import React from 'react';
import '@fontsource/roboto';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import MyTabs from './Tabs';

const DetailDog = ({ result }) => {
  return (
    <Box my={5} ml={2}>
      <Typography variant="body1" color="textPrimary">
        {`Here what we found about the dog picture`}
      </Typography>
      <Box my={3} />
      <MyTabs mode="dog" result={result} />
    </Box>
  );
};

export default DetailDog;
