import React, { useCallback, useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import Header from './Header';
import Page from '../../components/Page';
import Details from './Details';
import { HTTPCustomResponse } from 'src/models/responses';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import GenericResult from './GenericResult';

const CustomUseCaseRunner: React.FunctionComponent = () => {
  // States
  const [isChanged, setIsChanged] = useState(false);
  const [query, setQuery] = useState('');
  const [useCaseList, setUseCaeList] = useState([]);
  const [selectedUseCase, setUseCase] = useState('');
  const [result, setResult] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);

  // event handlers
  const handleExecute = async () => {
    if (query !== '') {
      const trimmedQuery = query.replace(/\s+/g, ' ');
      const data = { query: trimmedQuery };
      try {
        setLoading(true);
        const res: HTTPCustomResponse = await axios.post('/KGNet/executeSparqlQuery', data);
        setLoading(false);
        if (res.status === 200) {
          // success
          enqueueSnackbar(res.data.message, {
            variant: 'success'
          });
          setResult(res.data.result);
          console.log(res.data);
        } else {
          enqueueSnackbar(res.data.message, {
            variant: 'error'
          });
        }
      } catch (error: any) {
        console.log(error);
        enqueueSnackbar(`Internal error from server`, {
          variant: 'error'
        });
      }
    } else {
      enqueueSnackbar('Query is empty', {
        variant: 'warning'
      });
    }
  };

  const loadUseCase = useCallback(async () => {
    const data2 = { query: '*' };
    try {
      const res: HTTPCustomResponse = await axios.post('/KGNet/searchKGNET_APIsCatalogue', data2);
      if (res.status === 200) {
        setUseCaeList(res.data.result);
      } else throw new Error('Internal error from back-end');
    } catch (error: any) {
      console.log(error.detail || error.message);
    }
  }, []);

  useEffect(() => {
    loadUseCase();
  }, [loadUseCase]);

  return (
    <Page title="Execute custom use cases">
      <Box>
        <Header />
        <Details
          query={query}
          selectedUseCase={selectedUseCase}
          setUseCase={setUseCase}
          useCaseList={useCaseList}
          setQuery={setQuery}
          setIsChanged={setIsChanged}
          isChanged={isChanged}
          handleExecute={handleExecute}
        />
        <Box my={3} />
        {isLoading && <LinearProgress />}
        {!isLoading && result !== undefined && result.length > 0 && <GenericResult result={result} />}
        {!isLoading && result !== undefined && result.length === 0 && (
          <Typography variant="h4" color="textPrimary">
            No result found; please check your query syntax
          </Typography>
        )}
      </Box>
    </Page>
  );
};

export default CustomUseCaseRunner;
