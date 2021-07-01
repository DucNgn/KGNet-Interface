import React, { useCallback, useEffect } from 'react';
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';
import Header from './Header';
import Details from './Details';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import Page from '../../components/Page';
import axios from '../../utils/axios';
const Result = () => {
  const location = useLocation();
  let params = queryString.parse(location.search);
  var result = axios.get('http://localhost:5050/KGNet/getDogBreedInfo').then((res) => {
    console.log(res.data);
  });
  const getData = useCallback(async () => {
    result = await axios.get('http://localhost:5050/KGNet/getDogBreedInfo');
  }, [params.mode]);

  useEffect(() => {
    getData();
    console.log('Here is the result');
    console.log(result);
  }, [getData]);

  return (
    <Page title="Result">
      <Box>
        <Header mode={params.mode} />
        <Details />
      </Box>
    </Page>
  );
};

export default Result;
