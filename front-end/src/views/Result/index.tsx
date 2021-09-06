import React, { useCallback, useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import MyTabs from './TabMenu';

const Result: React.FunctionComponent = ({ data, mode, handleExecute }: any) => {
  const [companyName, setCompanyName] = useState('');
  const [criteria, setCriteria] = useState('');
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('');
  const [shapOriginalImage, setShapOriginalImage] = useState('');
  const [shapDescription, setShapDescription] = useState('');
  const [queryKeywords, setQueryKeywords] = useState('');

  const getData = useCallback(() => {
    setQuery(data.Query);
    setQueryKeywords(data.QueryKeywords);
    setResult(data.result);
    setShapOriginalImage(data.SHAPFigure);
    setShapDescription(data.SHAPDescription);
  }, [data]);

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
    <Box>
      {result ? (
        <Box>
          {returnPageDescription(`${mode}`)}
          <Box my={3} />
          <MyTabs
            mode={`${mode}`}
            result={result}
            query={query}
            setUserQuery={setQuery}
            queryKeywords={queryKeywords}
            shapOriginalImage={shapOriginalImage}
            shapDescription={shapDescription}
            handleExecute={handleExecute}
          />
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default Result;
