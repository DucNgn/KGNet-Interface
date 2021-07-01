import React, { useState } from 'react';
import '@fontsource/roboto';
import { Typography, makeStyles } from '@material-ui/core';
import { Box } from '@material-ui/core';
import MyTabs from './Tabs';

const useStyles = makeStyles((theme) => ({
  link: {
    [theme.breakpoints.down('md')]: {
      width: 300
    },
    width: 400
  },
  card: {
    [theme.breakpoints.down('md')]: {
      width: 300
    },
    width: 600,
    minHeight: 300
  },
  centerItem: {
    alignItems: 'center',
    textAlign: 'center'
  },
  nothingToDisplay: {
    paddingTop: '600px'
  }
}));
const DetailDog = ({ result }) => {
  const classes = useStyles();

  return (
    <Box mt={5} ml={2}>
      <Typography variant="body1" color="textPrimary">
        {`Here what we found for the dog `}
      </Typography>
      <Box my={3} />
      <MyTabs result={result} />
    </Box>
  );
};

export default DetailDog;
