import React from 'react';
import '@fontsource/roboto';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import MyTabs from './Tabs';

const DetailDog = ({ mode, result, query, queryKeywords, shapOriginalImage, shapDescription }) => {
  return (
    <Box my={5} ml={2}>
      <Typography variant="body1" color="textPrimary">
        {`Here is what we found about the dog picture`}
      </Typography>
      <Box my={3} />
      <MyTabs
        mode={mode}
        result={result}
        query={query}
        querKeywords={queryKeywords}
        shapOriginalImage={shapOriginalImage}
        shapDescription={shapDescription}
      />
    </Box>
  );
};

export default DetailDog;
