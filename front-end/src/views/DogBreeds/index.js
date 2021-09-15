import React, { useState } from 'react';
import '@fontsource/roboto';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import Header from './Header';
import Details from './Details';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import Result from '../Result';
import useDebounce from '../../hooks/useDebounce';

const DogBreeds = () => {
  // states
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const debouncedLink = useDebounce(link, 500);
  const [customQuery, setCustomQuery] = useState();

  // event handlers
  const handleShowResult = async () => {
    // make request here
    setLoading(true);
    setData(undefined); // reset data
    try {
      const data = { img_url: debouncedLink };
      const res = await axios.post('/KGNet/getDogBreedInfo', data);
      if (res.status === 200) {
        setData(res.data);
      } else throw new Error('Internal error');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleExecute = async () => {
    // make request here
    setLoading(true);
    setData(undefined); //reset result
    if (customQuery !== undefined || customQuery !== '') {
      const trimmedQuery = customQuery.replace(/\s+/g, ' ');
      const data = { query: trimmedQuery };
      try {
        const res = await axios.post('/KGNet/executeSparqlQuery', data);
        if (res.status === 200) {
          console.log('Received success response');
          console.log(res);
          setData(res.data);
        } else throw new Error('Internal error');
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <Page title="KGNET - Dog Breed Finder">
      <Box>
        <Header />
        <Details handleShowResult={handleShowResult} debouncedLink={debouncedLink} setLink={setLink} />
        {isLoading && <LinearProgress />}
        {data !== undefined && data !== '' && (
          <Result setCustomQuery={setCustomQuery} data={data} mode="dogInfo" handleExecute={handleExecute} />
        )}
        {data === '' && !isLoading && <Typography variant="overline">Error: Please check your input</Typography>}
      </Box>
    </Page>
  );
};

export default DogBreeds;
