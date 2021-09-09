import { Box, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  result: any;
};

const GenericResult: React.FunctionComponent<Props> = ({ result }) => {
  // States

  // event handlers

  return (
    <Box>
      <Typography variant="h1" color="textPrimary">
        Result for your query:
      </Typography>
      {Object.keys(result).map((key: string) => {
        <Typography variant="body1" color="textPrimary">
          {key}: {result[key]}
        </Typography>;
      })}
    </Box>
  );
};

export default GenericResult;
