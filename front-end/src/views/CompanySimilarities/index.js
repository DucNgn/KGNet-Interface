import React, { useState } from 'react';
import Details from './Details';
import Header from './Header';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import Result from '../Result';
import { LinearProgress, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const CompanySimilarities = () => {
  // States
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [similarityFeature, setSimilarityFeature] = useState('profits');
  const { enqueueSnackbar } = useSnackbar();
  const [customQuery, setCustomQuery] = useState();

  // event handlers
  const handleShowResult = async () => {
    if (companyName !== '') {
      // make request here
      setLoading(true);
      setData(undefined); // reset result
      try {
        const data = { company_name: companyName, similarity_feature: similarityFeature };
        const res = await axios.post('KGNet/getForbes2013SimilarCompanies', data);
        if (res.status === 200) {
          const json_data = res.data;
          setData(json_data);
          if (res.data.Query) setCustomQuery(res.data.Query);
        } else throw new Error('Internal error');
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      enqueueSnackbar('Company name is missing', {
        variant: 'error'
      });
    }
  };

  const handleExecute = async () => {
    // make request here
    setLoading(true);
    setData(undefined); // reset data
    if (customQuery !== undefined || customQuery !== '') {
      const trimmedQuery = customQuery.replace(/\s+/g, ' ');
      const data = { query: trimmedQuery };
      try {
        const res = await axios.post('/KGNet/executeSparqlQuery', data);
        if (res.status === 200) {
          setData(res.data);
          if (res.data.Query) setCustomQuery(res.data.Query);
        } else throw new Error('Internal error');
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <Page title="KGNET - Companies Similarities">
      <Header />
      <Details
        handleShowResult={handleShowResult}
        similarityFeature={similarityFeature}
        setCompanyName={setCompanyName}
        setSimilarityFeature={setSimilarityFeature}
      />
      {isLoading && <LinearProgress />}
      {data !== undefined && data !== '' && (
        <Result setCustomQuery={setCustomQuery} data={data} mode="companies" handleExecute={handleExecute} />
      )}
      {data === '' && !isLoading && <Typography variant="overline">Error: Please check your input</Typography>}
    </Page>
  );
};

export default CompanySimilarities;
