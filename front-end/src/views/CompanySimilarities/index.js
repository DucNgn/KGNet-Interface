import React, { useState } from 'react';
import Details from './Details';
import Header from './Header';
import Page from '../../components/Page';
import axios from '../../utils/axios';
import Result from '../Result';
import { LinearProgress } from '@material-ui/core';

const CompanySimilarities = () => {
  // States
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(false)
  const [companyName, setCompanyName] = useState('');
  const [similarityFeature, setSimilarityFeature] = useState('')

  const handleShowResult = async () => {
    // make request here
    setLoading(true)
    try {
      const data = {"company_name": companyName, "similarity_feature": similarityFeature};
      const res = await axios.post("KGNet/getForbes2013SimilarCompanies", data);
      if (res.status === 200) {
        setData(res.data)
        setLoading(false)
        console.log("SHOULD NOT SHOW SPINNER NOW")
        console.log(res.data)
      }
      else throw new Error('Internal error')
    } catch (error) {
      console.log(error)
    }
  };

  // TODO: May change to execute SPAQL QUERY
  const handleExecute = async () => {
    // make request here
    setLoading(true)
    try {
      const data = {"company_name": companyName, "similarity_feature": similarityFeature};
      const res = await axios.post("/KGNet/getForbes2013SimilarCompanies", data);
      if (res.status === 200) {
        setData(res.data)
      }
      else throw new Error('Internal error')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  };

  console.log("Inside index company")
  console.log(isLoading)
  console.log("Type of data response")
  console.log(typeof data)

  return (
    <Page title="KGNET - Companies Similarities">
      <Header />
      <Details handleShowResult={handleShowResult} setCompanyName={setCompanyName} setSimilarityFeature={setSimilarityFeature} />
      {data !== undefined && <Result data={data} mode='companies' handleExecute={handleExecute} />}
    </Page>
  );
};

export default CompanySimilarities;
