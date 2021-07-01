import React from 'react';
import '@fontsource/roboto';
import { Typography, Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box mt={5} ml={2}>
      <Typography variant="body1" color="error">
        {`Cannot found what you are looking for !`}
      </Typography>
      <Box my={3} />
      <Button component={Link} to="/" variant="contained" color="primary">
        Go back to homepage ?
      </Button>
    </Box>
  );
};

export default NotFound;
