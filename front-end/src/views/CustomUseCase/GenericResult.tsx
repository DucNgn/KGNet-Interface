import { Box, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  result: any[];
};

const GenericResult: React.FunctionComponent<Props> = ({ result }) => {
  // States

  // event handlers

  /* eslint-disable array-callback-return */

  console.log(result.length)
  return (
    <Box>
      <Typography variant="h4" color="textPrimary">
        Result for your query:
      </Typography>
      {result.map((res: any, idx: number) => {
        return(
        <Box>
          <Typography variant="body1" color="textPrimary">
            {idx+1}
          </Typography>
          {Object.keys(res).map((key: string) => {
            <Typography variant="body1" color="textPrimary">
              {key}: {res[key]}
            </Typography>
          })}
        </Box>);
      })}
    </Box>
  );
};

export default GenericResult;
