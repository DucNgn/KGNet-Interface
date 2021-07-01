import React, { useCallback, useEffect, useState } from 'react';
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
  const [companyName, setCompanyName] = useState('');
  const [criteria, setCriteria] = useState('');
  const [result, setResult] = useState([]);
  let params = queryString.parse(location.search);
  var res = {};

  const getData = useCallback(async () => {
    if (params.mode === 'dog') res = await axios.get('http://localhost:5050/KGNet/getDogBreedInfo');
    else if (params.mode === 'companies')
      res = await axios.get('http://localhost:5050/KGNet/getForbes2013SimilarCompanies');
    setCompanyName(params.company);
    setCriteria(params.criteria);
    setResult(res.data);
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
        <Details companyName={companyName} criteria={criteria} result={result} />
      </Box>
    </Page>
  );
};

export default Result;
