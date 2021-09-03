import React, { useState } from 'react';
import '@fontsource/roboto';
import { Box, LinearProgress } from '@material-ui/core';
import Header from './Header';
import Details from './Details';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import Result from '../Result';
import useDebounce from '../../hooks/useDebounce';

const DogBreeds = () => {
  // states
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(false)
  const [link, setLink] = useState('');
  const debouncedLink = useDebounce(link, 500);

  const handleShowResult = async () => {
    // make request here
    setLoading(true)
    try {
      const res = await axios.get(`/KGNet/getDogBreedInfo?img_url=${debouncedLink}`);
      if (res.status === 200) {
        setData(res.data)
      }
      else throw new Error('Internal error')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  };

  const handleExecute = async () => {
    // make request here
    setLoading(true)
    try {
      const res = await axios.get(`/KGNet/getDogSimilarTo?img_url=${debouncedLink}`);
      if (res.status === 200) {
        setData(res.data)
      }
      else throw new Error('Internal error')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  };

  return (
    <Page title="KGNET - Dog Breed Finder">
      <Box>
        <Header />
        <Details handleShowResult={handleShowResult} debouncedLink={debouncedLink} setLink={setLink} />
        {isLoading && <LinearProgress />}
        {data !== undefined && <Result data={data} mode='dogInfo' handleExecute={handleExecute} />}
      </Box>
    </Page>
  );
};

export default DogBreeds;
