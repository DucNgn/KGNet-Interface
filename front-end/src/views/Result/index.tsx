import React, { useCallback, useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import Header from './Header';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import { useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import MyTabs from './TabMenu';

const Result: React.FunctionComponent = () => {
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
    let res: AxiosResponse = {
      data: {},
      status: 201,
      statusText: '',
      headers: '',
      config: {}
    };
    if (params.mode === 'dogInfo') {
      res = await axios.get('/KGNet/getDogBreedInfo');
    } else if (params.mode === 'dogSimilarity') {
      res = await axios.get('/KGNet/getDogSimilarTo');
    } else if (params.mode === 'companies') {
      res = await axios.get('/KGNet/getForbes2013SimilarCompanies');
      setCompanyName(`${params.company}`);
      setCriteria(`${params.criteria}`);
    } else history.push('/404');
    console.log(res.data.SHAPFigure);
    setQuery(res.data.Query);
    setQueryKeywords(res.data.QueryKeywords);
    setResult(res.data.result);
    setShapOriginalImage(res.data.SHAPFigure);
    setShapDescription(res.data.SHAPDescription);
  }, [params.mode, history, params.company, params.criteria]);

  useEffect(() => {
    getData();
  }, [getData]);

  const returnPageDescription = (mode: string): React.ReactNode => {
    if (mode === 'companies')
      return (
        <Box my={5} ml={2}>
          <Typography variant="body1" color="textPrimary">
            {`There are ${result.length} similar companies to ${companyName} in term of ${criteria}`}
          </Typography>
        </Box>
      );
    else if (mode === 'dogInfo' || mode === 'dogSimilarity')
      return (
        <Box my={5} ml={2}>
          <Typography variant="body1" color="textPrimary">
            {`Here is what we found about the dog picture`}
          </Typography>
        </Box>
      );
    else
      return (
        <Box my={5} ml={2}>
          <Typography variant="body1" color="textPrimary">
            {`Here is what we found`}
          </Typography>
        </Box>
      );
  };

  return (
    <Page title="Result">
      {result ? (
        <Box>
          <Header mode={`${params.mode}`} />
          {returnPageDescription(`${params.mode}`)}
          <Box my={3} />
          <MyTabs
            mode={`${params.mode}`}
            result={result}
            query={query}
            setUserQuery={setQuery}
            queryKeywords={queryKeywords}
            shapOriginalImage={shapOriginalImage}
            shapDescription={shapDescription}
          />
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Page>
  );
};

export default Result;
