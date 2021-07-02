import React, { useCallback, useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Box } from '@material-ui/core';
import Header from './Header';
import DetailCompany from './DetailCompany';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import DetailDog from './DetailDog';
import { useHistory } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const history = useHistory();
  const [companyName, setCompanyName] = useState('');
  const [criteria, setCriteria] = useState('');
  const [result, setResult] = useState([]);
  let params = queryString.parse(location.search);

  const getData = useCallback(async () => {
    let res;
    if (params.mode === 'dog') {
      res = await axios.get('/KGNet/getDogBreedInfo');
      setResult(res.data);
    } else if (params.mode === 'companies') {
      res = await axios.get('/KGNet/getForbes2013SimilarCompanies');
      setCompanyName(params.company);
      setCriteria(params.criteria);
      setResult(res.data);
    } else history.push('/404');
  }, [params.mode, history, params.company, params.criteria]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Page title="Result">
      <Box>
        <Header mode={params.mode} />
        {params.mode === 'companies' ? (
          <DetailCompany companyName={companyName} criteria={criteria} result={result} />
        ) : null}
        {params.mode === 'dog' ? <DetailDog result={result} /> : null}
      </Box>
    </Page>
  );
};

export default Result;
