import React, { useCallback, useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Box, LinearProgress } from '@material-ui/core';
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
  const [query, setQuery] = useState('');
  const [shapOriginalImage, setShapOriginalImage] = useState('');
  const [shapDescription, setShapDescription] = useState('');
  const [queryKeywords, setQueryKeywords] = useState('');
  let params = queryString.parse(location.search);

  const getData = useCallback(async () => {
    let res;
    if (params.mode === 'dog') {
      res = await axios.get('/api/KGNet/getDogBreedInfo');
      setQuery(res.data.Query);
      setQueryKeywords(res.data.QueryKeywords);
      setResult(res.data.result);
      setShapOriginalImage(res.data.SHAPFigure);
      setShapDescription(res.data.SHAPDescription);
    } else if (params.mode === 'dogSimilarity') {
      res = await axios.get('/api/KGNet/getDogSimilarTo');
      setQuery(res.data.Query);
      setQueryKeywords(res.data.QueryKeywords);
      setResult(res.data.result);
      setShapOriginalImage(res.data.SHAPFigure);
      setShapDescription(res.data.SHAPDescription);
    } else if (params.mode === 'companies') {
      res = await axios.get('/api/KGNet/getForbes2013SimilarCompanies');
      setCompanyName(params.company);
      setCriteria(params.criteria);
      setQuery(res.data.Query);
      setQueryKeywords(res.data.QueryKeywords);
      setResult(res.data.result);
      setShapOriginalImage(res.data.SHAPFigure);
      setShapDescription(res.data.SHAPDescription);
    } else history.push('/404');
    console.log(res.data.SHAPFigure);
  }, [params.mode, history, params.company, params.criteria]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Page title="Result">
      {result ? (
        <Box>
          <Header mode={params.mode} />
          {params.mode === 'companies' ? (
            <DetailCompany
              companyName={companyName}
              criteria={criteria}
              result={result}
              query={query}
              queryKeywords={queryKeywords}
              shapOriginalImage={shapOriginalImage}
              shapDescription={shapDescription}
            />
          ) : null}
          {params.mode === 'dog' ? (
            <DetailDog
              mode="dogInfo"
              result={result}
              query={query}
              queryKeywords={queryKeywords}
              shapOriginalImage={shapOriginalImage}
              shapDescription={shapDescription}
            />
          ) : null}
          {params.mode === 'dogSimilarity' ? (
            <DetailDog
              mode="dogSimilarity"
              result={result}
              query={query}
              queryKeywords={queryKeywords}
              shapOriginalImage={shapOriginalImage}
              shapDescription={shapDescription}
            />
          ) : null}
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Page>
  );
};

export default Result;
