import React from 'react';
import '@fontsource/roboto';
import Header from './Header';
import Page from '../../components/Page';
import { Box } from '@material-ui/core';
import Details from './Details';

const AddUseCase = () => {
  return (
    <Page title="Add custom use case">
      <Header />
      <Box my={2}>
        <Details />
      </Box>
    </Page>
  );
};

export default AddUseCase;
