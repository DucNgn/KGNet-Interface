import React from 'react';
import '@fontsource/roboto';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import MyTabs from './Tabs';

const DetailCompany = ({ companyName, criteria, result, query, queryKeywords, shapOriginalImage, shapDescription }) => {
  return (
    <Box my={5} ml={2}>
      <Typography variant="body1" color="textPrimary">
        {`There are ${result.length} similar companies to ${companyName} in term of ${criteria}`}
      </Typography>
      <Box my={3} />
      <MyTabs
        mode="companies"
        result={result}
        query={query}
        queryKeywords={queryKeywords}
        shapOriginalImage={shapOriginalImage}
        shapDescription={shapDescription}
      />
    </Box>
  );
};

export default DetailCompany;
