import React, { useCallback, useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import MyTabs from './TabMenu';

const Result: React.FunctionComponent = ({ customQuery, setCustomQuery, data, mode, handleExecute }: any) => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState(customQuery);
  const [shapOriginalImage, setShapOriginalImage] = useState('');
  const [shapDescription, setShapDescription] = useState('');
  const [queryKeywords, setQueryKeywords] = useState('');

  const getData = useCallback(() => {
    if (data.Query) setQuery(data.Query);
    if (data.QueryKeywords) setQueryKeywords(data.QueryKeywords);
    if (data.result) setResult(data.result);
    if (data.SHAPFigure) setShapOriginalImage(data.SHAPFigure);
    if (data.SHAPDescription) setShapDescription(data.SHAPDescription);
  }, [data]);

  useEffect(() => {
    getData();
  }, [getData]);

  const returnPageDescription = (mode: string): React.ReactNode => {
    if (mode === 'dogInfo' || mode === 'dogSimilarity')
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
            setUserQuery={setCustomQuery}
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
